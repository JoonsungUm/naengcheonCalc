import React, {FC, ReactNode, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {HStack, VStack} from '@react-native-material/core';

import {Colors} from 'react-native/Libraries/NewAppScreen';

interface SectionProps {
  title: string;
  count: number;
  setCount: (count: number) => void;
  price: number;
  children: ReactNode;
}

const Section: FC<SectionProps> = ({
  children,
  title,
  count,
  setCount,
  price,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const handleMinus = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handlePlus = () => {
    setCount(count + 1);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <HStack m={8} spacing={60} style={{justifyContent: 'center'}}>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {children}
        </Text>
        <View>
          <TouchableOpacity style={styles.countButton} onPress={handleMinus}>
            <Text style={styles.countButtonText}>-</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {count}
        </Text>
        <View>
          <TouchableOpacity style={styles.countButton} onPress={handlePlus}>
            <Text style={styles.countButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
              minWidth: 140,
            },
          ]}>
          {count * price}원
        </Text>
      </HStack>
    </View>
  );
};

interface TotalPriceSectionProps {
  totalPrice: number;
  setAdultCount: (count: number) => void;
  setChildrenCount: (count: number) => void;
  setAdultWithBootCount: (count: number) => void;
  setChildrenWithBootCount: (count: number) => void;
}

const TotalPriceSection: FC<TotalPriceSectionProps> = ({
  totalPrice,
  setAdultCount,
  setChildrenCount,
  setAdultWithBootCount,
  setChildrenWithBootCount,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <HStack m={8} spacing={60} style={styles.footer}>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => {
          setAdultCount(0);
          setChildrenCount(0);
          setAdultWithBootCount(0);
          setChildrenWithBootCount(0);
        }}>
        <Text style={styles.resetButtonText}>리셋</Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.totalPriceSection,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        총 금액: {totalPrice}원
      </Text>
    </HStack>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [adultWithBootCount, setAdultWithBootCount] = useState(0);
  const [childrenWithBootCount, setChildrenWithBootCount] = useState(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <VStack m={8} spacing={8} divider={true}>
          <View>
            <Text style={styles.mainTitle}>
              냉천어촌체험마을 2023 요금 계산기
            </Text>
          </View>
          <View>
            <Text style={styles.containerTitle}>장화 미 지참 체험객</Text>
            <Section
              title="어른(중학생 이상) - 입장료, 장화, 대여장비 포함"
              count={adultCount}
              setCount={setAdultCount}
              price={10000}>
              10000원
            </Section>
            <Section
              title="어린이(5살~초등학생) - 입장료, 장화, 대여장비 포함"
              count={childrenCount}
              setCount={setChildrenCount}
              price={8000}>
              8000원
            </Section>
          </View>

          <View>
            <Text style={styles.containerTitle}>장화 지참 체험객</Text>
            <Section
              title="어른(중학생 이상) - 입장료, 대여장비 포함"
              count={adultWithBootCount}
              setCount={setAdultWithBootCount}
              price={8000}>
              8000원
            </Section>
            <Section
              title="어린이(5살~초등학생) - 입장료, 대여장비 포함"
              count={childrenWithBootCount}
              setCount={setChildrenWithBootCount}
              price={5000}>
              5000원
            </Section>
          </View>

          <TotalPriceSection
            totalPrice={
              adultCount * 10000 +
              childrenCount * 8000 +
              adultWithBootCount * 8000 +
              childrenWithBootCount * 5000
            }
            setAdultCount={setAdultCount}
            setChildrenCount={setChildrenCount}
            setAdultWithBootCount={setAdultWithBootCount}
            setChildrenWithBootCount={setChildrenWithBootCount}
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    color: 'black',
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 50,
  },
  containerTitle: {
    color: 'black',
    fontSize: 32,
    textAlign: 'center',
    paddingVertical: 10,
  },
  sectionContainer: {
    margin: 32,
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 38,
    fontWeight: '400',
  },
  countButton: {
    minHeight: 64,
    minWidth: 64,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
  },
  countButtonText: {
    marginTop: -8,
    fontSize: 58,
    fontWeight: '400',
    textAlign: 'center',
  },
  resetButton: {
    height: 64,
    minWidth: 100,
    marginTop: 16,
    marginRight: 240,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'space-evenly',
  },
  resetButtonText: {
    marginTop: 0,
    fontSize: 26,
    fontWeight: '400',
    textAlign: 'center',
  },
  footer: {
    justifyContent: 'center',
    paddingVertical: 32,
  },
  totalPriceSection: {
    margin: 24,
    fontSize: 42,
    fontWeight: '600',
    textAlign: 'right',
  },
});

export default App;
