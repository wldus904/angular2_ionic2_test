import {Page, Platform, NavController, ActionSheet} from 'ionic-angular';
import {CordovaOauth, Facebook} from 'ng2-cordova-oauth/core';

@Page({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
	
	// import값 파라미터 리턴하기
	static get parameters() {
        return [[Platform], [NavController]];
    }
	
	constructor(Platform, NavController) {// 파라미터 리턴 순서대로 리턴받기
		console.log("Platform", Platform);
		console.log("NavController", NavController);
        this.platform = Platform;
        this.nav = NavController;
        this.cordovaOauth = new CordovaOauth(new Facebook({clientId: "CLIENT_ID_HERE", appScope: ["email"]}));
        
        this.aa = "jy_test project!";// aa에 값 저장
        this.onKeyValue = "avdf";
    }
	
	login() {
        this.platform.ready().then(() => {
            this.cordovaOauth.login().then((success) => {
                alert(success.access_token);
            }, (error) => {
                alert(error);
            });
        });
    }
	
	onKey(event) {
		this.onKeyValue = event.target.value;
	}
	
	changeMsg() {
		alert("change!");
		this.aa = "you click changeValue!";
	}
	
	openMenu() {
	    let actionSheet = ActionSheet.create({
	      title: 'Albums',
	      cssClass: 'action-sheets-basic-page',
	      buttons: [
	        {
	          text: 'Delete',
	          role: 'destructive',
	          icon: !this.platform.is('ios') ? 'trash' : null,
	          handler: () => {
	            console.log('Delete clicked');
	          }
	        },
	        {
	          text: 'Share',
	          icon: !this.platform.is('ios') ? 'share' : null,
	          handler: () => {
	            console.log('Share clicked');
	          }
	        },
	        {
	          text: 'Play',
	          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
	          handler: () => {
	            console.log('Play clicked');
	          }
	        },
	        {
	          text: 'Favorite',
	          icon: !this.platform.is('ios') ? 'heart-outline' : null,
	          handler: () => {
	            console.log('Favorite clicked');
	          }
	        },
	        {
	          text: 'Cancel',
	          role: 'cancel', // will always sort to be on the bottom
	          icon: !this.platform.is('ios') ? 'close' : null,
	          handler: () => {
	            console.log('Cancel clicked');
	          }
	        }
	      ]
	    });

	    this.nav.present(actionSheet);
	  }
  
}
