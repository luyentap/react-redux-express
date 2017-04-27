import React, { Component } from 'react'
import {Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'

const styles = {
  title: {
    top: '37vw',
    position: 'absolute',
    textAlign: 'center',
    fontSize: '6vw',
    height: '6vw',
    padding: '8px 0 8px 0'
  },
  text: {
    top: '45.8vw',
    position: 'absolute',
    textAlign: 'center',
    fontSize: '3vw',
    height: 'auto',
  }
}

const PageHero = ({ image, title, text }) => {
  console.log(title)
  return (
    <Card>
      <CardMedia>
        <img src={image} />
        <div style={styles.title}>{title}</div>
        <div style={styles.text}>{text}</div>
      </CardMedia>
    </Card>
  )
}

export default PageHero