import { Component } from '@angular/core';
import {AuthServiceService} from 'src/app/services/auth-service.service';
import { UserService} from 'src/app/services/user.service';
import { ImagenesService} from 'src/app/services/imagenes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent{
  esAdmi: boolean=false;
  esUsuario:boolean=false;
  tokenUser: string='';
  nameUser: string='';
  suscription!: Subscription;
  imagePerfil: string='';
  constructor(private authService: AuthServiceService, private user: UserService, private image: ImagenesService) { 
    this.tokenUser=this.user.getToken()!;
    this.nameUser=this.authService.getiNameUser(this.tokenUser);
    // console.log('este es el rol del usuario',this.user.getRole());
    
    if(this.authService.getRoleUser(this.tokenUser)==='administrador'){
      this.esAdmi=true;
      // console.log('es administrador');
      
    }else if(this.authService.getRoleUser(this.tokenUser)==='usuario'){
      console.log('es usuario')
      // this.esUsuario=true;
    }
    

  }
  
  isLoggedIn() {
    return this.authService.isAuthenticated()
    
  }
  logout(){
    this.authService.logout();
    localStorage.clear();
  }

}
