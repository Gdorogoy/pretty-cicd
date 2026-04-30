import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server } from 'socket.io';

@WebSocketGateway({namespace:'live'})
export class SocketGateway implements OnGatewayConnection,OnGatewayDisconnect{

 @WebSocketServer() server!: Server;

  constructor(private readonly socketService: SocketService) {}

  handleDisconnect(client: any) {
  }
  handleConnection(client: any, ...args: any[]) {
  }

  async sendUpadte(data:any){
    this.server.emit('update',data);
  }


}
