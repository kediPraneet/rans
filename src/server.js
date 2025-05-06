import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Track connected clients and admins with more detailed information
const connectedClients = new Map();
const connectedAdmins = new Set();

// Helper function to log current state
const logCurrentState = () => {
  console.log('\n=== Current Server State ===');
  console.log('Connected Clients:', Array.from(connectedClients.entries()).map(([id, info]) => ({
    id,
    connectedAt: info.connectedAt,
    lastActivity: info.lastActivity
  })));
  console.log('Connected Admins:', Array.from(connectedAdmins));
  console.log('===========================\n');
};

// Helper function to notify all admins
const notifyAdmins = (event, data) => {
  connectedAdmins.forEach(adminId => {
    console.log(`Notifying admin ${adminId} about ${event}`);
    io.to(adminId).emit(event, data);
  });
};

io.on('connection', (socket) => {
  console.log('\n=== New Connection ===');
  console.log('Socket ID:', socket.id);
  logCurrentState();

  // Handle registration
  socket.on('register', (role) => {
    console.log(`\n=== Registration Request ===`);
    console.log(`Socket ID: ${socket.id}`);
    console.log(`Requested Role: ${role}`);
    
    if (role === 'admin') {
      // Register as admin
      connectedAdmins.add(socket.id);
      console.log('Admin registered successfully');
      
      // Send current client list to the new admin
      const clientList = Array.from(connectedClients.entries());
      console.log('Sending client list to new admin:', clientList);
      socket.emit('clientList', clientList);
      
    } else if (role === 'client') {
      // Register as client
      const clientInfo = {
        id: socket.id,
        connectedAt: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      };
      connectedClients.set(socket.id, clientInfo);
      console.log('Client registered successfully');
      
      // Notify all admins about the new client
      notifyAdmins('clientConnected', clientInfo);
      
    } else if (role === 'none') {
      // Clean up registrations
      if (connectedAdmins.has(socket.id)) {
        connectedAdmins.delete(socket.id);
        console.log('Admin registration removed');
      }
      if (connectedClients.has(socket.id)) {
        const clientInfo = connectedClients.get(socket.id);
        connectedClients.delete(socket.id);
        console.log('Client registration removed');
        // Notify all admins about the removed client
        notifyAdmins('clientDisconnected', socket.id);
      }
    }
    
    logCurrentState();
  });

  // Handle client messages
  socket.on('messageFromClient', (message) => {
    console.log('\n=== Client Message ===');
    console.log('From Client:', socket.id);
    console.log('Message:', message);
    
    // Update client's last activity
    if (connectedClients.has(socket.id)) {
      const clientInfo = connectedClients.get(socket.id);
      clientInfo.lastActivity = new Date().toISOString();
      connectedClients.set(socket.id, clientInfo);
      console.log('Updated client last activity');
    }

    // Forward message to all admins
    notifyAdmins('messageToAdmin', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('\n=== Disconnection ===');
    console.log('Socket ID:', socket.id);
    console.log('Before disconnection:');
    logCurrentState();
    
    if (connectedAdmins.has(socket.id)) {
      connectedAdmins.delete(socket.id);
      console.log('Admin disconnected');
    } else if (connectedClients.has(socket.id)) {
      const clientInfo = connectedClients.get(socket.id);
      connectedClients.delete(socket.id);
      console.log('Client disconnected');
      // Notify all admins about the disconnected client
      notifyAdmins('clientDisconnected', socket.id);
    }
    
    console.log('After disconnection:');
    logCurrentState();
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`\n=== Server Started ===`);
  console.log(`Server running on port ${PORT}`);
  console.log('Waiting for connections...\n');
}); 