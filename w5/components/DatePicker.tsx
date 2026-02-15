// components/DatePicker.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  error?: string;
  touched?: boolean;
}

export default function DatePicker({
  label,
  value,
  onChange,
  error,
  touched,
}: DatePickerProps) {
  const [show, setShow] = useState(false);
  const hasError = touched && error;

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View className="w-full mb-4">
      <Text className="text-gray-700 font-semibold mb-2 text-base">
        {label}
      </Text>

      <TouchableOpacity
        onPress={() => setShow(true)}
        className={`
          w-full px-4 py-3 rounded-lg border-2
          ${hasError ? "border-red-500" : "border-gray-300"}
          bg-white
        `}
      >
        <Text className="text-gray-800 text-base">{formatDate(value)}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}

      {hasError && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}