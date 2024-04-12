import {Component} from "@angular/core";
@Component({
  selector: 'navbar',
  template: `
    <div class="navbar">
      <div class="menu-item">
        <div class="icon"><i class="fa fa-home"></i></div>
        <div class="menu-text">Accueil</div>
      </div>
      <div class="menu-item">
        <div class="icon"><i class="fa fa-building"></i></div>
        <div class="menu-text">Cuma</div>
      </div>
      <div class="menu-item">
        <div class="icon"><i class="fa fa-calendar"></i></div>
        <div class="menu-text">Réservation</div>
      </div>
      <div class="menu-item">
        <div class="icon"><i class="fa fa-check-circle"></i></div>
        <div class="menu-text">Validation Réservation</div>
      </div>
      <div class="menu-item">
        <div class="icon"><i class="fa fa-pen"></i></div>
        <div class="menu-text">Post Réservation</div>
      </div>
      <div class="menu-item">
        <div class="icon"><i class="fa fa-ticket"></i></div>
        <div class="menu-text">Bon Travail</div>
      </div>
      <div class="menu-item">
        <div class="icon"><i class="fa fa-clock"></i></div>
        <div class="menu-text">Saisie Temps</div>
      </div>
      <div class="menu-item">
        <div class="icon"><i class="fa fa-check-square"></i></div>
        <div class="menu-text">Validation des bons</div>
      </div>
      <div class="menu-item">
        <div class="icon"><i class="fa fa-chart-bar"></i></div>
        <div class="menu-text">Statistiques</div>
      </div>
      <div class="menu-item">
        <div class="icon"><i class="fa fa-carrot"></i></div>
        <div class="menu-text">Karnott</div>
      </div>
      <div class="menu-item">
        <div class="icon"><i class="fa fa-user"></i></div>
        <div class="menu-text"> Profil</div>
      </div>
    </div>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
    }

    .menu-item {
      display: grid;
      grid-template-rows: 50px;
      grid-template-columns: 30px 100%;
    }

    .icon{
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .menu-text {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  `]
})
export class NavbarComponent {

}
