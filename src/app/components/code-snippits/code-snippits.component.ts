import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from '../../../../node_modules/rxjs';

interface Tag{
  fullList:string;
}

@Component({
  selector: 'app-code-snippits',
  templateUrl: './code-snippits.component.html',
  styleUrls: ['./code-snippits.component.css']
})
export class CodeSnippitsComponent implements OnInit {
  
  constructor(private afs: AngularFirestore) { }
  ngOnInit() {
    this.tagCollection = this.afs.collection('code-snippits').doc('tags');
    this.tagString = this.tagCollection.valueChanges();
    
    this.tagString.subscribe(res =>{
      this.tags = res.fullList.split(" ");
      this.tags = this.convertToTagModel(this.tags);
      console.log(this.tags)
    })
  }
  
  tags:any[] = [];
  tagCollection: AngularFirestoreDocument<Tag>;
  tagString: Observable<Tag>;
  tagList: any;
  filteredTags: any[];
  userInput:string;
  
  selectedTags:string[] = [];
  
  onSelect(){
    console.log('onSelect')
    //Add the selected tag to an array.
    var selectedTag = this.tagList.name
    this.selectedTags.push(selectedTag);
    //Remove the selected tag from the existing arrray.
    
    this.removeSelectedTag(selectedTag);
    this.tagList = null;
    console.log(this.selectedTags);
    
    
  }
  
  saveTags(){
    var value ="";
    var listLength = this.selectedTags.length;
    for(var i = 0; i < listLength; i++){
      if(value !== ""){
        value = value + " " + this.selectedTags[i];
      }else{
        value = this.selectedTags[i]
      }
    }
    listLength = this.tags.length;
    for(var i = 0; i < listLength; i++){
      if(value !== ""){
        value = value + " " + this.tags[i].name;
      }else{
        value = this.tags[i].name;
      }
      
    }
    
    this.afs
    .collection('code-snippits')
    .doc('tags').set({
      'fullList': value
    })
    console.log(value);
  }
  
  addNewTag(){
    this.selectedTags.push(this.userInput);
    this.userInput = null;
    this.tagList = null;
    console.log(this.selectedTags)
  }
  
  removeSelectedTag(selectedTag){
    for(var i = 0; i < this.tags.length; i++){
      if(selectedTag === this.tags[i].name){
        this.tags.splice(i,1);
      }
    }
  }
  
  convertToTagModel(arrayOfTags){
    var value:any[] = [];
    var listLength = arrayOfTags.length;
    for(var i = 0; i < listLength; i++){
      var temp = {
        name: arrayOfTags[i]
      }
      value.push(temp);
    }
    return value;
  }
  
  filterTagSingle(event) {
    let query = event.query;
    this.filteredTags = this.filterTag(query, this.tags);
  }
  
  filterTag(query, tags: any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    for(let i = 0; i < tags.length; i++) {
      let tag = tags[i];
      if(tag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(tag);
      }
    }
    return filtered;
  }
}
