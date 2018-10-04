import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Slider } from 'react-native';

const lightBlue = '#7FC4FD';
const darkBlue = '#2699FB';
const white = '#fff';

const styles = StyleSheet.create({
    body: {
        backgroundColor: lightBlue,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    container: {
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    headerOne: {
        alignSelf: 'center',
        color: white,
        fontSize: 50,
    },
    sliders: {
        paddingTop: 20,
    },
    slideContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    slideLabelContainer: {
        paddingRight: 10,
        maxWidth: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    slideLabel: {
        fontSize: 20, 
        color: white,
    },
    slideSlider: {
        flexGrow: 1,
        maxWidth: '60%'
    },
    submitButton: {
        marginTop: 20,
        width: '100%',
        height: 50,
        backgroundColor: darkBlue,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    centerText: {
        fontSize: 20,
        color: white,
        textAlign: 'center'
    },
    categories: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    category:{
        backgroundColor: 'red',
        width: 125,
        height: 125,
        margin: 5
    }
});

class UserPref extends Component {
    constructor() {
        super()
        this.state = {
            sliderCategories: 0.25,
            sliderPriceRange: 0.25,
            sliderRating: 0.25,
            sliderRange: 0.25,
        }
    }
    checkAndAffect = (value, toChange) => {
        const newState = this.state;
        newState[toChange] = value;
        this.setState(newState);
    }
    render() {
        return (
            <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.headerOne}>Prefrences</Text>
                    <View style={styles.sliders}>
                        <View style={styles.slideContainer}>
                        <View style={styles.slideLabelContainer}>
                            <Text style={styles.slideLabel}>Categories</Text>
                        </View>
                        <Slider 
                            maximumValue={10}
                            minimumValue={0}
                            value={2.5}
                            step={0.5}
                            onValueChange={value => {
                                this.checkAndAffect(value, 'sliderCategories')
                            }}
                            style={styles.slideSlider}
                        />
                    </View>
                        <View style={styles.slideContainer}>
                        <View style={styles.slideLabelContainer}>
                            <Text style={styles.slideLabel}>Price Range</Text>
                        </View>
                        <Slider 
                            maximumValue={10}
                            minimumValue={0}
                            value={2.5}
                            step={0.5}
                            onValueChange={value => {
                                this.checkAndAffect(value, 'sliderPriceRange')
                            }}
                            style={styles.slideSlider}
                        />
                    </View>
                        <View style={styles.slideContainer}>
                        <View style={styles.slideLabelContainer}>
                            <Text style={styles.slideLabel}>Rating</Text>
                        </View>
                        <Slider 
                            maximumValue={10}
                            minimumValue={0}
                            value={2.5}
                            step={0.5}
                            onValueChange={value => {
                                this.checkAndAffect(value, 'sliderRating')
                            }}
                            style={styles.slideSlider}
                        />
                    </View>
                        <View style={styles.slideContainer}>
                        <View style={styles.slideLabelContainer}>
                            <Text style={styles.slideLabel}>Range</Text>
                        </View>
                        <Slider 
                            maximumValue={10}
                            minimumValue={0}
                            value={2.5}
                            step={0.5}
                            onValueChange={value => {
                                this.checkAndAffect(value, 'sliderRange')
                            }}
                            style={styles.slideSlider}
                        />
                    </View>
                    </View>
                    <View style={styles.categories}>
                        <View style={styles.category}>
                            <Text>Test Category</Text>
                        </View>
                        <View style={styles.category}>
                            <Text>Test Category</Text>
                        </View>
                        <View style={styles.category}>
                            <Text>Test Category</Text>
                        </View>
                        <View style={styles.category}>
                            <Text>Test Category</Text>
                        </View>
                        <View style={styles.category}>
                            <Text>Test Category</Text>
                        </View>
                        <View style={styles.category}>
                            <Text>Test Category</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPressIn={() => {
                        styles.submitButton = {
                            marginTop: 20,
                            width: '100%',
                            height: 50,
                            backgroundColor: '#33658E',
                            borderRadius: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }
                        this.setState(this.state)
                    }} onPressOut={() => {
                        styles.submitButton = {
                            marginTop: 20,
                            width: '100%',
                            height: 50,
                            backgroundColor: darkBlue,
                            borderRadius: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }
                        this.setState(this.state)
                    }}>
                        <View style={styles.submitButton}>
                            <Text style={styles.centerText}>Submit</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        )
    }
}

export default UserPref;