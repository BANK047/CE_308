// components/RadioButton.tsx
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioButtonProps {
  label: string;
  options: RadioOption[];
  selected: string;
  onSelect: (value: string) => void;
  error?: string;
  touched?: boolean;
}

export default function RadioButton({
  label,
  options,
  selected,
  onSelect,
  error,
  touched,
}: RadioButtonProps) {
  const hasError = touched && error;

  return (
    <View className="w-full mb-4">
      <Text className="text-gray-700 font-semibold mb-2 text-base">
        {label}
      </Text>

      <View className="flex-row flex-wrap">
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => onSelect(option.value)}
            className="flex-row items-center mr-6 mb-2"
            activeOpacity={0.7}
          >
            <View
              className={`
                w-6 h-6 rounded-full border-2 mr-2
                ${selected === option.value ? "border-blue-600" : "border-gray-300"}
                flex items-center justify-center
              `}
            >
              {selected === option.value && (
                <View className="w-3 h-3 rounded-full bg-blue-600" />
              )}
            </View>
            <Text className="text-gray-700 text-base">{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {hasError && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}