import React from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';

const items = [
  {
    title: 'What is Llama?',
    content: 'It is a South American mammal that is a cousin to the camel.'
  },
  {
    title: 'What do llamas eat?',
    content: 'Llamas eat grass and various grains like corn.'
  },
  {
    title: 'Why do llamas spit?',
    content: 'Llamas spit when they are angry, but they usually spit at other llamas or predators.'
  }
];

function App() {
  return (
    <div>
      <h3><em>Nav bar coming soon</em></h3>
      <Search />
    </div>
  );
}

export default App;
