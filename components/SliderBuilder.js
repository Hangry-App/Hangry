import React, { Component } from 'react';
import { StyleSheet, Slider, View, Text } from 'react-native';
import _set from 'lodash/set'

class SliderBuilder extends Component {
    constructor(props) {
        super();
        this.state = {
            maxVal: props.maxVal,
            minVal: props.minVal,
            step: props.step,
            parentState: props.state,
        } 
    }
    render() {
        return (
            <View style={styles.slideContainer}>
            <View style={styles.slideLabelContainer}>
                <Text
                    style={[
                        styles.slideLabel,
                        styles.centerText,
                    ]}
                >
                    Cuisine Type
                </Text>
            </View>
            <Slider
                maximumValue={10}
                minimumValue={0}
                value={parentState.weights.categories}
                step={0.5}
                onValueChange={value => {
                    _set(
                        parentState,
                        'weights.categories',
                        value
                    )
                }}
                style={styles.slideSlider}
            />
        </View> 
        )
    }
}