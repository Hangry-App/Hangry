import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableWithoutFeedback,
    TouchableHighlight,
    ScrollView,
    Slider,
} from 'react-native'
import * as firebase from 'firebase'
import _set from 'lodash/set'

const lightBlue = '#7FC4FD'
const darkBlue = '#2699FB'
const white = '#fff'

const foodTypes = [
    ['PIZZA', '4bf58dd8d48988d1ca941735'],
    ['AMERICAN', '4bf58dd8d48988d14e941735'],
    ['CHINESE ', '4bf58dd8d48988d145941735'],
    ['SUSHI', '4bf58dd8d48988d1d2941735'],
    ['MEXICAN ', '4bf58dd8d48988d1c1941735'],
    ['SALAD', '4bf58dd8d48988d1bd941735'],
    ['INDIAN', '4bf58dd8d48988d10f941735'],
    ['PERUVIAN', '4eb1bfa43b7b52c0e1adc2e8'],
    ['THAI', '4bf58dd8d48988d149941735'],
]

class UserPref extends Component {
    constructor() {
        super()
        this.state = {
            weights: {
                categories: 5,
                priceRange: 5,
                rating: 5,
                range: 5,
            },
            categories: {
                '4d4b7105d754a06374d81259': 0.5, // Note, this is the food general category in foursquare -- setting as initial state in case there are no food preferences
            },
            priceTier: 2,
            rating: 4,
            distance: 5000,
        }
    }
    getPrefs = async () => {
        const userId = firebase.auth().currentUser.uid
        const db = await firebase.database()
        const ref = await db.ref('userPreferences').child(userId)
        ref.once('value', snapshot => {
            const userData = snapshot.val()
            userData !== null && this.setPrefs(userData)
        })
    }
    setPrefs = prefs => {
        this.setState(prefs)
    }
    async savePreferences() {
        const db = firebase.database()
        const user = await firebase.auth()
        const userId = user.currentUser.uid
        db.ref('userPreferences/' + userId).set(this.state)
    }
    async componentDidMount() {
        await this.getPrefs()
        console.log('State => ', this.state)
    }
    render() {
        return (
            <View style={styles.body}>
                <TouchableWithoutFeedback
                    onPressOut={() => {
                        this.props.navigation.navigate('Main')
                    }}
                >
                    <Image
                        style={{ height: 25, width: 25, marginTop: 10 }}
                        source={require('../assets/baseline-arrow_back_ios-white-18/2x/baseline_arrow_back_ios_white_18dp.png')}
                    />
                </TouchableWithoutFeedback>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={[styles.headerOne, styles.centerText]}>
                        Preferences
                    </Text>
                    <View style={styles.sliders}>
                        <View style={styles.slideContainer}>
                            <View style={styles.slideLabelContainer}>
                                <Text
                                    style={[
                                        styles.slideLabel,
                                        styles.centerText,
                                    ]}
                                >
                                    Categories
                                </Text>
                            </View>
                            <Slider
                                maximumValue={10}
                                minimumValue={0}
                                value={this.state.weights.categories}
                                step={0.5}
                                onValueChange={value => {
                                    _set(
                                        this.state,
                                        'weights.categories',
                                        value
                                    )
                                }}
                                style={styles.slideSlider}
                            />
                        </View>
                        <View style={styles.slideContainer}>
                            <View style={styles.slideLabelContainer}>
                                <Text style={styles.slideLabel}>
                                    Price Range
                                </Text>
                            </View>
                            <Slider
                                maximumValue={10}
                                minimumValue={0}
                                value={this.state.weights.priceRange}
                                step={0.5}
                                onValueChange={value => {
                                    _set(
                                        this.state,
                                        'weights.priceRange',
                                        value
                                    )
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
                                value={this.state.weights.rating}
                                step={0.5}
                                onValueChange={value => {
                                    _set(this.state, 'weights.rating', value)
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
                                value={this.state.weights.range}
                                step={0.5}
                                onValueChange={value => {
                                    _set(this.state, 'weights.range', value)
                                }}
                                style={styles.slideSlider}
                            />
                        </View>
                    </View>
                    <View style={styles.distances}>
                        <TouchableHighlight
                            style={[
                                this.state.distance === 1000
                                    ? styles.selectedButton
                                    : styles.button,
                                styles.shadow,
                            ]}
                            selected={(() => this.state.distance === 1000)()}
                            onPressIn={() => this.setState({ distance: 1000 })}
                        >
                            <Text style={styles.centerText}>Walk</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[
                                this.state.distance === 5000
                                    ? styles.selectedButton
                                    : styles.button,
                                styles.shadow,
                            ]}
                            selected={(() => this.state.distance === 5000)()}
                            onPressIn={() => this.setState({ distance: 5000 })}
                        >
                            <Text style={styles.centerText}>Bike</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={[
                                this.state.distance === 10000
                                    ? styles.selectedButton
                                    : styles.button,
                                styles.shadow,
                            ]}
                            selected={(() => this.state.distance === 10000)()}
                            onPressIn={() => this.setState({ distance: 10000 })}
                        >
                            <Text style={styles.centerText}>Drive</Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <View style={styles.sliders}>
                            <View style={styles.slideContainer}>
                                <View style={styles.slideLabelContainer}>
                                    <Text style={styles.slideLabel}>
                                        Price Tier
                                    </Text>
                                </View>
                                <Slider
                                    maximumValue={4}
                                    minimumValue={1}
                                    value={this.state.priceTier}
                                    step={1}
                                    onValueChange={value => {
                                        _set(this.state, 'priceTier', value)
                                    }}
                                    style={styles.slideSlider}
                                />
                            </View>
                        </View>
                        <View style={styles.slideContainer}>
                            <View style={styles.slideLabelContainer}>
                                <Text style={styles.slideLabel}>Rating</Text>
                            </View>
                            <Slider
                                maximumValue={10}
                                minimumValue={1}
                                value={this.state.rating}
                                step={0.5}
                                onValueChange={value => {
                                    _set(this.state, 'rating', value)
                                }}
                                style={styles.slideSlider}
                            />
                        </View>
                    </View>
                    <View style={styles.categories}>
                        <Text style={styles.boldWhite}>Favorite Cuisines</Text>
                        <View>
                            {foodTypes.map(foodType => {
                                return (
                                    <TouchableHighlight
                                        key={foodType[1]}
                                        selected={(() =>
                                            this.state.categories[
                                                foodType[1]
                                            ])()}
                                        onPressIn={() => {
                                            console.log('State => ', this.state)
                                            const categoryState = () =>
                                                this.state.categories
                                            let currentCategories = categoryState()
                                            if (
                                                currentCategories[
                                                    foodType[1]
                                                ] &&
                                                currentCategories[
                                                    foodType[1]
                                                ] === 0.5
                                            ) {
                                                currentCategories[
                                                    foodType[1]
                                                ] = 0.0
                                                if (
                                                    Object.values(
                                                        currentCategories
                                                    ).reduce(
                                                        (a, b) => a + b
                                                    ) === 0
                                                ) {
                                                    currentCategories[
                                                        '4d4b7105d754a06374d81259'
                                                    ] = 0.5
                                                }
                                            } else {
                                                currentCategories[
                                                    foodType[1]
                                                ] = 0.5
                                                currentCategories[
                                                    '4d4b7105d754a06374d81259'
                                                ] = 0
                                            }
                                            this.setState({
                                                categories: currentCategories,
                                            })
                                        }}
                                    >
                                        <View
                                            style={
                                                this.state.categories[
                                                    foodType[1]
                                                ] === 0.5
                                                    ? styles.selectedButton
                                                    : styles.category
                                            }
                                        >
                                            <Text style={styles.centerText}>
                                                {foodType[0]}
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                )
                            })}
                        </View>
                    </View>
                    <TouchableHighlight
                        onPressIn={() => {
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
                            this.setState(prevState => prevState)
                        }}
                        onPressOut={async () => {
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
                            this.setState(prevState => prevState)
                            await this.savePreferences()
                            this.props.navigation.navigate('Main')
                        }}
                    >
                        <View style={[styles.submitButton, styles.shadow]}>
                            <Text style={styles.boldWhite}>Submit</Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 2,
        shadowOpacity: 0.2,
    },
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
        justifyContent: 'space-between',
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
        maxWidth: '60%',
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
    boldWhite: {
        fontSize: 20,
        color: white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    categories: {},
    button: {
        backgroundColor: 'white',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 4,
        margin: 5,
        minWidth: 30,
        minHeight: 15,
    },
    selectedButton: {
        backgroundColor: 'red',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 4,
        margin: 5,
        minWidth: 30,
        minHeight: 15,
    },
    category: {
        backgroundColor: 'white',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
        margin: 5,
    },
    distances: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    distance: {
        backgroundColor: 'white',
        flexGrow: 1,
        paddingHorizontal: 4,
        paddingVertical: 2,
        margin: 10,
        borderRadius: 4,
        display: 'flex',
    },
    centerText: {
        textAlign: 'center',
    },
})

export default UserPref
