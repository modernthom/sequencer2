/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

let stepButtons = [];
let j = 0;
let sound1;

function preload(){
  sound1 = loadSound("SNARE2_HIPHOP2.wav");}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}  

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position (0, 0);
  canvas.style ('z-index', '-1');
  setInterval(getArrayContent, 200);
  for (let i = 0; i < 16; i++) {
    stepButtons[i] = new StepButton(1, [i]);} 
}

function draw() {
  background(180);
  for (let i = 0; i < stepButtons.length; i++) {
    stepButtons[i].dessine();
    stepButtons[i].animate();}}

function getArrayContent() {
  stepButtons[j].longueur = (width / 16) * 3;
  stepButtons[j].longueurChangeante = -2;
    if (stepButtons[j].trigger == 1) {
    sound1.play();
  }
  j++;
  if (j >= 16) {
    j = 0;};}

function mousePressed() {
  for (let i = 0; i < 16; i++) {
    stepButtons[i].clicked();}}

class StepButton {
  constructor(numeroLigne, numeroColonne) {
    this.couleur = (255);
    this.x = ((width / 16) * 2) * numeroLigne;
    this.y = (height / 16) * numeroColonne;
    this.longueur = (width / 16) * 2;
    this.hauteur = height / 16;
    this.longueurChangeante = 0
    this.trigger = 0}
  dessine() {
    fill(this.couleur);
    noStroke();
    rect(this.x, this.y, this.longueur, this.hauteur, 10);}
  animate() {
    this.longueur = this.longueur + this.longueurChangeante;
    if (this.longueur <= (width / 16) * 2) {
          this.longueurChangeante = 0;
          this.longueur = (width / 16) * 2;}}
  clicked() {
    let dX = mouseX - this.x;
    let dY = mouseY - this.y;
    if (dX < this.longueur && dX > 0 && dY < this.hauteur && dY > 0) {
    if (this.trigger == 0){
          this.trigger =1;
          this.couleur = 63;}
    else {
          this.trigger = 0;
          this.couleur = 255;}
      this.longueur = (width / 16) * 3;
      this.longueurChangeante = -6;}
  }}