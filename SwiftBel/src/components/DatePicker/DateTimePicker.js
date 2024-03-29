import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Platform, Modal, TouchableOpacity, Image } from 'react-native';

import DatePicker from '@react-native-community/datetimepicker';
import styles from './style'
import { RippleButton } from '..';
import moment from 'moment';
import { chevrondown } from '../../assets';
import { palette } from '../../theme';
import CalendarPicker from 'react-native-calendar-picker';
const DateTimePicker = (props) => {
    const [isPickerShow, setIsPickerShow] = useState(false);
    const [onFocus, setOnFocus] = useState(false);
    const [value, setValue] = useState("DD MM YY")
    const showPicker = () => {
        setIsPickerShow(true);
    };

    const onChange = (value) => {
        props.onChange(value)
        console.log(value, "value")
        if (Platform.OS === 'android') {
            setIsPickerShow(false);
            setOnFocus(false)
        }
    };
    const onselect = (date) => {
        setIsPickerShow(false)
        setOnFocus(false)
        props.OnSelectedDate(date);
    }
    const onCancel = () => {
        props.onCancel();
        setIsPickerShow(false);
        setOnFocus(false)
    }
    const renderDataAndroid = () => {
        return (
            isPickerShow && (
                <View style={{ alignSelf: 'center' }}>
                    <DatePicker
                        value={props.value ? props.value : new Date()}
                        mode='datetime'
                        textColor='black'       
                        dateFormat='YYYY-MM-DD'
                        maximumDate={new Date()}
                        minimumDate={new Date(1850, 0, 1)}
                        display={Platform.OS === 'ios' ? 'spinner' : 'spinner'}
                        is24Hour={false}
                        onChange={onChange}
                        style={styles.datePicker}
                    />
                </View>
            )
        )
    }
    const renderPickerIOS = () => {

        const renderOptionList = () => {
            return (
                <View style={[styles.overlayStyle, props.overlayStyle]}>
                    <View style={[styles.optionContainer, props.optionContainer]}>
                        {isPickerShow && (
                            <View style={{ alignSelf: 'center',marginTop:20}}>
                              <CalendarPicker
                                onDateChange={onChange}
                                //scrollable={true}
                              // horizontal={true}
                               // initialDate={new Date()}
                                maxDate={"01/01/2050"}
                                minDate={new Date()}
                                selectedDayColor={palette.pink}
        />
                            </View>
                        )}
                        <View style={styles.modalButton}>
                            <RippleButton
                                buttonView={{ alignItems: 'center' }}
                                ButtonText={"Cancel"}
                                button={styles.backButton}
                                onPress={() => onCancel()}
                            />
                            <RippleButton
                                buttonView={{ alignItems: 'center', paddingLeft: 30 }}
                                ButtonText={"Select"}
                                buttonTextStyle={[styles.buttonText, props.rightButtonTextStyke]}
                                button={[styles.button, props.rightButtonStyle]}
                                onPress={() => onselect()}
                                isDisable={props.isDisable}
                                indicator={props.rightIndicator}
                            />
                        </View>
                    </View>
                </View>
            )
        }
        return <View>
            <Modal
                transparent
                visible={isPickerShow}
                animationType={"slide"}>
                {renderOptionList()}
            </Modal>
        </View>
    }
    return (
        <View style={props.DateContainerStyle}>
            {props.headerName ? <Text style={styles.headerText}>{props.headerName}</Text> : null}
            <View style={[styles.btnContainer]}>
                <TouchableOpacity onPress={() => {
                    showPicker(true)
                    setOnFocus(true)
                }} style={[styles.PickerButton, props.buttonStyle, { borderColor: onFocus ? palette.black : palette.lightGrey }]}>
                    <View style={styles.PickerButtonContainer}>
                        {props.value ?
                            <Text style={styles.PickerButtontext}>{`${moment(props.value).format('DD/MM/YYYY')}`}</Text>
                            : <Text style={[styles.PickerButtontext, { color: palette.grey }]}>{"DD MM YY"}</Text>}
                        <Image
                            source={chevrondown}
                            resizeMode='contain'
                            style={styles.Icon}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            {Platform.OS == 'android' ? renderDataAndroid() : renderPickerIOS()}

        </View>
    );
};
DateTimePicker.defaultProps = {
    value: '',
    onChange: () => { },
    headerName: '',
    onCancel: () => { },
    OnSelectedDate: () => { }
}
export default DateTimePicker;
