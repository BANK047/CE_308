import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const router = useRouter();
    const menuItems = [
        { icon: 'person-circle', title: 'แก้ไขโปรไฟล์', subtitle: 'อัปเดตข้อมูลส่วนตัว' },
        { icon: 'lock-closed', title: 'ความเป็นส่วนตัว', subtitle: 'จัดการการตั้งค่าความเป็นส่วนตัว' },
        { icon: 'notifications', title: 'การแจ้งเตือน', subtitle: 'จัดการการแจ้งเตือน' },
        { icon: 'help-circle', title: 'ช่วยเหลือ', subtitle: 'คำถามที่พบบ่อย' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.avartar}></View>
                <Text style={styles.headerName}>Supot Choojongkol</Text>
                <Text style={styles.subTitle}>bankchoojongkol@gmail.com</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avartar: {
        height: 100,
        width: 100,
        backgroundColor: '#aaaaaa',
        borderRadius: 50,
    },
    headerName: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 7,
    },
    subTitle: {
        color: '#a8a8a8',
    },
});
