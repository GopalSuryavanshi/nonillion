import React from 'react'
import ReviewList from './ReviewList'
import { Header } from './Header'
import { ScrollView } from 'react-native'

const ReviewRating = () => {
  
  
  return (
    <>
 
         <Header Title={"Reviews"}></Header>
         <ScrollView style={{ flex: 1, backgroundColor: 'white',paddingHorizontal:10 }}>
        <ReviewList></ReviewList>
    </ScrollView>

    </>
  )
}

export default ReviewRating