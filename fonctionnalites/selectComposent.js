import { StyleSheet, View ,Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function SelectComposent({ data,defaulValue, updateValue,styleSelect}) {

    return (
        <SelectDropdown
        data={data}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          updateValue(selectedItem)
        }}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View  style={{...styles.dropdownButtonStyle,width:styleSelect.width,height:styleSelect.height}}>
              {(selectedItem && selectedItem.Icon) && (
                <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
              )}
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || defaulValue.title}
              </Text>
              <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View  style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
              {
                item.icon && (<Icon name={item.icon} style={styles.dropdownItemIconStyle} />)
              }
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    );
}



const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: 150,
      height: 30,
      backgroundColor: '#E9ECEF',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 13,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownButtonArrowStyle: {
      fontSize: 20,
    },
    dropdownButtonIconStyle: {
      fontSize: 20,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 13,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 20,
      marginRight: 8,
    },
  });

export default SelectComposent;