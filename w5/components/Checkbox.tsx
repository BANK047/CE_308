// components/Checkbox.tsx
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  error?: string;
  touched?: boolean;
}

export default function Checkbox({
  label,
  checked,
  onPress,
  error,
  touched,
}: CheckboxProps) {
  const hasError = touched && error;

  return (
    <View className="w-full mb-4">
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center"
        activeOpacity={0.8}
      >
        <View
          className={`
            w-6 h-6 rounded border-2 mr-3
            ${checked ? "bg-blue-600 border-blue-600" : "border-gray-300"}
            ${hasError ? "border-red-500" : "border-gray-300"}
            flex items-center justify-center
          `}
        >
          {checked && <Text className="text-white font-bold"></Text>}
        </View>
        <Text className="text-gray-700 text-base flex-1">{label}</Text>
      </TouchableOpacity>

      {hasError && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
}