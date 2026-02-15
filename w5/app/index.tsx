// app/index.tsx
import "./global.css";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Checkbox from "../components/Checkbox";
import RadioButton from "../components/RadioButton";
import DatePicker from "../components/DatePicker";

// Interface สำหรับข้อมูล Form
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string; // Workshop 4.1
  gender: string; // Workshop 4.3
  dateOfBirth: Date; // Workshop 4.4
  acceptTerms: boolean; // Workshop 4.2
}

// Interface สำหรับ Error Messages
interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: string;
  acceptTerms?: string;
}

export default function Index() {
  // State สำหรับเก็บข้อมูล Form
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    gender: "",
    dateOfBirth: new Date(),
    acceptTerms: false,
  });

  // State สำหรับเก็บ Error Messages
  const [errors, setErrors] = useState<FormErrors>({});

  // State สำหรับเช็คว่า field ใดถูก touch แล้ว
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // State สำหรับ loading
  const [isLoading, setIsLoading] = useState(false);

  // ฟังก์ชัน Validation สำหรับแต่ละ field
  const validateField = ( name: string, value: string | Date | boolean): string | undefined => {
    switch (name) {
      case "fullName":
        if (!(value as string).trim()) {
          return "กรุณากรอกชื่อ-นามสกุล";
        }
        if ((value as string).trim().length < 3) {
          return "ชื่อ-นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร";
        }
        return undefined;

      case "email":
        if (!(value as string).trim()) {
          return "กรุณากรอกอีเมล";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value as string)) {
          return "รูปแบบอีเมลไม่ถูกต้อง";
        }
        return undefined;

      case "phone":
        if (!(value as string).trim()) {
          return "กรุณากรอกเบอร์โทรศัพท์";
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value as string)) {
          return "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก";
        }
        return undefined;

      case "password":
        if (!(value as string)) {
          return "กรุณากรอกรหัสผ่าน";
        }
        if ((value as string).length < 6) {
          return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
        }
        return undefined;

      case "confirmPassword":
        if (!(value as string)) {
          return "กรุณายืนยันรหัสผ่าน";
        }
        if (value !== formData.password) {
          return "รหัสผ่านไม่ตรงกัน";
        }
        return undefined;

      // Workshop 4.1 - Validate ที่อยู่
      case "address":
        if (!(value as string).trim()) {
          return "กรุณากรอกที่อยู่";
        }
        if ((value as string).trim().length < 10) {
          return "ที่อยู่ต้องมีอย่างน้อย 10 ตัวอักษร";
        }
        return undefined;

      // Workshop 4.3 - Validate เพศ
      case "gender":
        if (!(value as string)) {
          return "กรุณาเลือกเพศ";
        }
        return undefined;

      // Workshop 4.4 - Validate วันเกิด
      case "dateOfBirth":
        const today = new Date();
        const birthDate = value as Date;
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          const actualAge = age - 1;
          if (actualAge < 13) {
            return "อายุต้องมากกว่า 13 ปี";
          }
        } else if (age < 13) {
          return "อายุต้องมากกว่า 13 ปี";
        }
        return undefined;

      // Workshop 4.2 - Validate ยอมรับข้อตกลง
      case "acceptTerms":
        if (!(value as boolean)) {
          return "กรุณายอมรับข้อกำหนดและเงื่อนไข";
        }
        return undefined;

      default:
        return undefined;
    }
  };

  // ฟังก์ชันจัดการเมื่อมีการเปลี่ยนแปลงค่าใน Input
  const handleChange = (
    name: keyof FormData,
    value: string | Date | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate real-time ถ้า field ถูก touch แล้ว
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // ฟังก์ชันจัดการเมื่อ Input ถูก blur (สูญเสียโฟกัส)
  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate เมื่อ blur
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // ฟังก์ชัน Validate ทั้ง Form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // ตรวจสอบทุก field
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    // Mark ทุก field ว่า touched แล้ว
    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return isValid;
  };

  // ฟังก์ชันจัดการเมื่อกด Submit
  const handleSubmit = async () => {
    // ปิด Keyboard
    Keyboard.dismiss();

    // Validate Form
    if (!validateForm()) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง");
      return;
    }

    // จำลองการส่งข้อมูล
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      // Format date
      const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      // Format gender
      const formatGender = (g: string) => {
        switch (g) {
          case "male":
            return "ชาย";
          case "female":
            return "หญิง";
          case "other":
            return "ไม่ระบุ";
          default:
            return "";
        }
      };

      Alert.alert(
        "สำเร็จ!",
        `ลงทะเบียนสำเร็จ!\n\nชื่อ: ${formData.fullName}\nอีเมล: ${
          formData.email
        }\nเบอร์: ${formData.phone}\nวันเกิด: ${formatDate(
          formData.dateOfBirth
        )}\nเพศ: ${formatGender(formData.gender)}`,
        [
          {
            text: "ตรวจสอบ",
            onPress: () => console.log("Form Data:", formData),
          },
          {
            text: "รีเซ็ตฟอร์ม",
            onPress: handleReset,
            style: "cancel",
          },
        ]
      );
    }, 2000);
  };

  // ฟังก์ชันรีเซ็ตฟอร์ม
  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      gender: "",
      dateOfBirth: new Date(),
      acceptTerms: false,
    });
    setErrors({});
    setTouched({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-gray-50"
          contentContainerClassName="pb-8"
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="bg-blue-600 pt-16 pb-8 px-6">
            <Text className="text-white text-3xl font-bold">
              ลงทะเบียนสมาชิก
            </Text>
            <Text className="text-blue-100 text-base mt-2">
              กรุณากรอกข้อมูลให้ครบถ้วน
            </Text>
          </View>

          {/* Form Container */}
          <View className="px-6 mt-6">
            {/* ชื่อ-นามสกุล */}
            <CustomInput
              label="ชื่อ-นามสกุล"
              placeholder="ระบุชื่อและนามสกุล"
              value={formData.fullName}
              onChangeText={(value) => handleChange("fullName", value)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              touched={touched.fullName}
              autoCapitalize="words"
            />

            {/* อีเมล */}
            <CustomInput
              label="อีเมล"
              placeholder="example@email.com"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* เบอร์โทรศัพท์ */}
            <CustomInput
              label="เบอร์โทรศัพท์"
              placeholder="0812345678"
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
              keyboardType="phone-pad"
              maxLength={10}
            />

            {/* Workshop 4.1 - ที่อยู่ (Multiline) */}
            <View className="w-full mb-4">
              <Text className="text-gray-700 font-semibold mb-2 text-base">
                ที่อยู่
              </Text>
              <TextInput
                className={`
                  w-full px-4 py-3 rounded-lg border-2
                  ${
                    touched.address && errors.address
                      ? "border-red-500"
                      : "border-gray-300"
                  }
                  bg-white text-base text-gray-800
                  h-[100px]
                `}
                placeholder="ระบุที่อยู่ 6 ตัวอักษร"
                value={formData.address}
                onChangeText={(value) => handleChange("address", value)}
                onBlur={() => handleBlur("address")}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={200}
                placeholderTextColor="#9CA3AF"
              />
              <View className="flex-row justify-between mt-1">
                {touched.address && errors.address && (
                  <Text className="text-red-500 text-sm">
                    {errors.address}
                  </Text>
                )}
                <Text className="text-gray-500 text-sm ml-auto">
                  {formData.address.length}/200
                </Text>
              </View>
            </View>

            {/* Workshop 4.3 - Gender Selection */}
            <RadioButton
              label="เพศ"
              options={[
                { label: "ชาย", value: "male" },
                { label: "หญิง", value: "female" },
                { label: "ไม่ระบุ", value: "other" },
              ]}
              selected={formData.gender}
              onSelect={(value) => {
                handleChange("gender", value);
                setTouched((prev) => ({ ...prev, gender: true }));
              }}
              error={errors.gender}
              touched={touched.gender}
            />

            {/* Workshop 4.4 - Date of Birth */}
            <DatePicker
              label="วันเกิด"
              value={formData.dateOfBirth}
              onChange={(date) => {
                handleChange("dateOfBirth", date);
                setTouched((prev) => ({ ...prev, dateOfBirth: true }));
              }}
              error={errors.dateOfBirth}
              touched={touched.dateOfBirth}
            />

            {/* รหัสผ่าน */}
            <CustomInput
              label="รหัสผ่าน"
              placeholder="อย่างน้อย 6 ตัวอักษร"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              autoCapitalize="none"
            />

            {/* ยืนยันรหัสผ่าน */}
            <CustomInput
              label="ยืนยันรหัสผ่าน"
              placeholder="ระบุรหัสผ่านอีกครั้ง"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            {/* Workshop 4.2 - Accept Terms Checkbox */}
            <Checkbox
              label="ฉันยอมรับข้อกำหนดและเงื่อนไข"
              checked={formData.acceptTerms}
              onPress={() => {
                handleChange("acceptTerms", !formData.acceptTerms);
                setTouched((prev) => ({ ...prev, acceptTerms: true }));
              }}
              error={errors.acceptTerms}
              touched={touched.acceptTerms}
            />

            {/* Buttons */}
            <View className="mt-4 space-y-3">
              <CustomButton
                title="ลงทะเบียน"
                onPress={handleSubmit}
                variant="primary"
                loading={isLoading}
              />

              <CustomButton
                title="รีเซ็ตฟอร์ม"
                onPress={handleReset}
                variant="secondary"
                disabled={isLoading}
              />
            </View>

            {/* Info Box */}
            <View className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <Text className="text-blue-800 font-semibold text-base mb-2">
                คำแนะนำ
              </Text>
              <Text className="text-blue-700 text-sm leading-5">
                - กรอกข้อมูลให้ถูกต้อง{"\n"}- อีเมลต้องอยู่รูปแบบที่ถูกต้อง{"\n"}
                - เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก{"\n"}-
                รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร{"\n"}-
                ที่อยู่ต้องมีอย่างน้อย 10 ตัวอักษร{"\n"}- อายุต้องมากกว่า 13 ปี
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}