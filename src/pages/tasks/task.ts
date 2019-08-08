import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';



@Component({
  selector: 'page-task',
  templateUrl: 'tasks.html'
})
export class TaskPage {

  @ViewChild('projectName') projectName;
  

  projects: any;
  user: any;
  
  taskDescription: string;

  constructor(public navCtrl: NavController, 
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    private storage: Storage) {

    this.storage.get('user').then(data =>{

      this.user = data;

      db.list('/users/' + this.user.user.uid + '/projects').snapshotChanges().subscribe(data => {
        
        this.projects = [];

        data.forEach(element => {
          const tasks = element.payload.val()['tasks'];
          
          const taskDone = [];  
          const taskTodo = [];  
          for (const key in tasks) {
            if (tasks.hasOwnProperty(key)) {
              const element = tasks[key];
              console.log(element.description)
              
              if (element.finishDate){
                taskDone.push({
                  id: key,
                  description: element.description
                });
              }else{
                taskTodo.push({
                  id: key,
                  description: element.description
                })
              }

            }
          }
          
          this.projects.push({
            name: element.key,
            createDate: element.payload.val()['createDate'],
            tasksDone: taskDone,
            tasksTodo: taskTodo
          });
        });
    });
    


     });

  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  public addProject(): void {

    const projectName = this.projectName.value;
    
    const itemsRef = this.db.list('users/' + this.user.user.uid + '/projects/' + projectName);
    itemsRef.set('createDate', new Date().getTime()).then((data )=>{
      this.presentToast('Project was added successfully');
      this.projectName.value = null;
    }).catch((error)=>{
      this.presentToast('Error');
    });
    
  }

  public completeTask(projectName: string, taskId: string) {
    const itemsRef = this.db.list('users/' + this.user.user.uid + '/projects/' + projectName + '/tasks/' + taskId);
    itemsRef.set('finishDate', new Date().getTime());
  }

  public addTask(projectName: string, description: string) {

    const itemsRef = this.db.list('users/' + this.user.user.uid + '/projects/' + projectName + '/tasks');

    itemsRef.push(
      {
        description: description,
        createDate: new Date().getTime()
      }
    );
  }

  public removeTask(projectName: string, taskId: string) {
    const itemsRef = this.db.list('users/' + this.user.user.uid + '/projects/' + projectName + '/tasks/' + taskId);
    itemsRef.remove();
  }

  public removeProject(projectName: string) {
    const itemsRef = this.db.list('users/' + this.user.user.uid + '/projects/' + projectName);
    itemsRef.remove();
  }

  public logout(): void {
    
    this.storage.remove('user').then(result => {
      this.user = null;
      this.navCtrl.setRoot(LoginPage);
    });
  }

 
}
