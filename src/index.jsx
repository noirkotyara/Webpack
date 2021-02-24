import Post from '@models/Post'
import * as $ from 'jquery'
import json from './assets/json'
import '@/styles/styles.css'
import logo from '@/assets/logo.png'
import csv from '@/assets/homes.csv'
import '@/styles/styles.less'
import '@/styles/styles.scss'
import './babel'
import React from 'react'
import { render } from 'react-dom'

const App = () => (
    <div class='container'>
        <div class='title'>WebpackCourse</div>
        <hr />
        <div class="logo"></div>
        <hr />
        <pre></pre>
        <hr />
        <div class="less-container">
            <h2>Less preprocessor</h2>
        </div>
        <hr />
        <div class="scss-container">
            <h2>Scss preprocessor</h2>
        </div>
    </div>
)
render(<App />, document.getElementById('app'))

const post = new Post('Webpack Post Title', logo)
$('pre').html(post.toString())
// console.log('Post toString: ' + post.toString())
// console.log('JSON +', json)
// console.log('csv +', csv)