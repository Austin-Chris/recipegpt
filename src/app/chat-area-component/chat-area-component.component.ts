import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/login/auth.service';

@Component({
  selector: 'app-chat-area-component',
  templateUrl: './chat-area-component.component.html',
  styleUrls: ['./chat-area-component.component.css']
})
export class ChatAreaComponentComponent implements OnInit {

  ingredients: any;
  constructor(
    private router: Router,
    private auth : AuthService
  ) { }

  ngOnInit(): void {
  }

  findRecipe(): void {
    this.appendToChat("user", this.ingredients);
    this.generateCompletion(this.ingredients);
    this.ingredients = "";
  }

  generateCompletion(ingredients: string): void {
    const apiKey = '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'; // Replace with your OpenAI API key
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    const maxTokens = 4000;
    const temperature = 0;
    const prompt = `you will be provided with text delimitted by double quotes, perform the following actions:
    1. Extract the food items from the texts and give me a recipe using only them.
    2. Give a name for the recipe."${ingredients}"`;


    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [{ 'role': 'system', 'content': 'Act as a Chef AI whose only task is to find a recipe using only the food items in the input' }, 
                 { 'role': 'user', 'content': prompt }],
      max_tokens: maxTokens,
      temperature: temperature
    };

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {
        // Process the response data
        console.log(data);
        const aiResponse = data['choices'][0]['message']['content'];
        this.appendToChat("ai", aiResponse);
      })
      .catch(error => {
        // Handle the error
        console.error('Error:', error);
      });
  }

  appendToChat(role: string, content: string): void {
    const chatContainer = document.getElementById("chat");
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
    messageContainer.classList.add(role);
    messageContainer.textContent = content;
    chatContainer!.appendChild(messageContainer);
  }

  logout(){

    this.auth.logout();
  }

}
