import { View, Text, TextInput } from 'react-native'

type CustomInputProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'; 
};

export const CustomInput =({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default'
}: CustomInputProps) => {
    return  (
        <View className='mb-4'>
            <Text className='text-base mb-2'>{label}</Text>

            <TextInput
                className='border border-gray-300 rounded-lg px-4 py-3 text-base'

                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
            />
        </View>
    );
};