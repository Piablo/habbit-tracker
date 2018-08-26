import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from '../../../../node_modules/rxjs';
import { Router } from '@angular/router';

interface Tag{
  fullList:string;
}

interface CodeSnippits {
  snippitId: number;
  tags: string;
}

@Component({
  selector: 'app-code-snippits',
  templateUrl: './code-snippits.component.html',
  styleUrls: ['./code-snippits.component.css']
})
export class CodeSnippitsComponent implements OnInit {
  
  constructor(private afs: AngularFirestore, private router: Router) { }
  ngOnInit() {
    this.tagCollection = this.afs.collection('code-snippits').doc('tags');
    this.tagString = this.tagCollection.valueChanges();
    
    this.tagString.subscribe(res =>{
      this.tags = res.fullList.split(" ");
      this.tags = this.convertToTagModel(this.tags);
    })

    this.codeSnippitCollection = this.afs.collection('code-snippits').doc('snippits').collection('list');
    this.codeSnippits = this.codeSnippitCollection.valueChanges();

    this.codeSnippits.subscribe(res =>{
      this.arrayOfAllTags = this.splitStringByArrary(res);
      console.log('over here 2');
      console.log(this.arrayOfAllTags);
    })

    

  }

  codeSnippitCollection:AngularFirestoreCollection;
  codeSnippits: Observable<any>;
  codeSnippitModel: CodeSnippits[];

  hideSaveSnippitButton:boolean = true;

  arrayOfAllTags:any[];
  
  tags:any[] = [];
  tagCollection: AngularFirestoreDocument<Tag>;
  tagString: Observable<Tag>;
  tagList: any;
  filteredTags: any[];
  userInput:string;
  selectedTags:string[] = [];

  
  
  onSelect(){
    //Add the selected tag to an array.
    var selectedTag = this.tagList.name
    this.selectedTags.push(selectedTag);
    //Remove the selected tag from the existing arrray.

    this.searchForTagMatch(selectedTag, this.arrayOfAllTags);

    console.log('over here');
      console.log(this.arrayOfAllTags);
    
    this.removeSelectedTag(selectedTag);
    this.tagList = null;
  }

  searchForTagMatch(tag, tagArray){
    var listLength = tagArray.length;
    var matchFound = false;
    var tempArrayHolder:any[] = [];

    for(var i = 0; i < listLength; i++){
      var innerlistLength = tagArray[i].length;
      for(var i1 = 0; i1 < innerlistLength; i1++){
        var temp = tagArray[i];
        if(tag === temp[i1]){
          tempArrayHolder.push(tagArray[i]);
          matchFound = true;
        }
      }
    }
    this.arrayOfAllTags = tempArrayHolder;
    console.log("here dude");
    if(tempArrayHolder.length === 0){
      this.hideSaveSnippitButton = false;
    }
  }

  snippitIndexs:any[] = [];

  splitStringByArrary(stringByArray){
    var listLength = stringByArray.length;
    var tempValue;
    var returnValue:any[] = [];
    //var 
    for(var i = 0; i < listLength; i++){
      tempValue = (stringByArray[i].tags).split(' ');
      this.snippitIndexs.push(stringByArray[i].snippitId)
      returnValue.push(tempValue);
    }
    return returnValue;
  }
  saveTags(){
    
    var addAllTags = true
    var value = this.convertArrayToString(this.selectedTags, addAllTags);
    this.afs
    .collection('code-snippits')
    .doc('tags').set({
      'fullList': value
    })
    
    this.saveSnippit(this.selectedTags, 'this is the snippit');
    this.selectedTags = [];
    this.router.navigate(['dashboard/to-do']);
    
  }
  addNewTag(){
    this.selectedTags.push(this.userInput);
    this.searchForTagMatch(this.userInput, this.arrayOfAllTags);
    this.userInput = null;
    this.tagList = null;
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
  saveSnippit(tagArray, snippit){
    var addAllTags = false;
    var tagString = this.convertArrayToString(tagArray, addAllTags);
    // console.log(tagString);

    // this.afs
    // .collection('code-snippits')
    // .doc('snippits')
    // .collection('list')
    // .doc('1')
    // .set({
    //   'tags': tagString
    // })
  }
  convertArrayToString(tagArray, addAllTags){
    var value ="";
    var listLength = tagArray.length;
    for(var i = 0; i < listLength; i++){
      if(value !== ""){
        value = value + " " + tagArray[i];
      }else{
        value = tagArray[i]
      }
    }
    if(addAllTags){
      listLength = this.tags.length;
      for(var i = 0; i < listLength; i++){
        if(value !== ""){
          value = value + " " + this.tags[i].name;
        }else{
          value = this.tags[i].name;
        }
      }
    }
    return value;
  }
}
