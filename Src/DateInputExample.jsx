import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const DateInputExample = () => {
  // Initialize selectedDate state with the current date
  const [selectedDate, setSelectedDate] = useState(new Date());
  // State to control the visibility of the date picker
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selected) => {
    console.log(selected);
    if (selected) {
      setSelectedDate(selected); // Update local state
    }
    setShowDatePicker(false); // Hide date picker after selection
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={openDatePicker}>
        <TextInput
          placeholder='Date of birth'
          style={{
            backgroundColor: '#f0f0f0',
            color: '#000',
            paddingHorizontal: 20,
            borderRadius: 10,
            borderWidth: 0,
            height: 50,
            fontSize: 18,
            fontFamily: 'Poppins-Regular'
          }}
          value={format(selectedDate, 'dd-MM-yyyy')} // Formatting the date from local state
          editable={false} // The input field is not editable; it only serves as a trigger for the date picker
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showDatePicker && (
        <TouchableOpacity
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          onPress={closeDatePicker}
        />
      )}
    </View>
  );
};

export default DateInputExample;
