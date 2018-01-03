import React, { Component } from 'react';
import { AppRegistry, Text, View, ListView, StyleSheet, Header, Footer, Row, ScrollView } from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

export default class DropdownList extends Component {
    constructor() {
        super();
        this.state = {
            //ListView
            categoryMap: {},
            getInitialState: function () {
                var dataSource = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2,
                    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
                });

                return {
                    //dataSource: dataSource.cloneWithRowsAndSections(this.convertArrayToMap())
                    dataSource: dataSource.cloneWithRowsAndSections(this.categoryMap)
                };
            },
            //ListView

            arrDays: [],
            arrFinal: [],
            chosenDay: [],
            makeList: function () {
                fetch("https://instasport.co/club/bright/api/schedule/dates/2017-12-24/2017-12-31/hall/95/?format=json", { "method": "GET" })
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log(responseData[0].start);
                        var arrDays = [];
                        for (var i = 0; i < responseData.length; i++) {
                            var re = new RegExp('-\\d{2}T');
                            var str = re.exec(responseData[i].start)[0];
                            re = new RegExp('\\d{2}');
                            str = re.exec(str)[0];

                            var flag = true;
                            for (var i1 = 0; i1 < arrDays.length; i1++) {
                                if (arrDays[i1] === str) {
                                    flag = false;
                                }

                            }
                            if (flag) {
                                arrDays.push(re.exec(str)[0]);
                            }
                        }
                        console.log(arrDays);

                        arrFinal = [];
                        for (var i = 0; i < arrDays.length; i++) {
                            var arrDay = [];
                            for (var i1 = 0; i1 < responseData.length; i1++) {
                                var re = new RegExp('-\\d{2}T');
                                var str = re.exec(responseData[i1].start)[0];
                                re = new RegExp('\\d{2}');
                                str = re.exec(str)[0];
                                if (str === arrDays[i]) {
                                    arrDay.push(responseData[i1].title + " --- " + responseData[i1].start);
                                }
                            }
                            arrFinal.push(arrDay);
                        }
                        this.arrDays = arrDays;
                        this.arrFinal = arrFinal;

                        //ListView
                        this.categoryMap = {};
                        for (var i = 0; i < arrDays.length; i++) {
                            this.categoryMap[arrDays[i]] = [];
                            for (var i1 = 0; i1 < arrFinal[i].length; i1++) {
                                var obj = { value: arrFinal[i][i1] };
                                this.categoryMap[arrDays[i]].push(obj);
                            }
                        }
                        console.log(this.categoryMap);
                        //ListView

                        //console.log(this.arrFinal);
                    });
            },
        }
    }

    renderRow(Item) {
        return (
            <Text style={styles.textLVRow}>{Item.value}</Text>
        )
    }

    renderSectionHeader(sectionData, category) {
        return (
            <Text style={styles.textLVSection}>{category}</Text>
        )
    }

    onDropdownWillShow1() {
        this.setState({
            arrDays: this.state.arrDays,
        })
    }
    onSelect1(i) {
        this.setState({
            chosenDay: this.state.arrFinal[i],
        })
    }

    render() {
        return (
            <View>
                {this.state.makeList()}
                <ModalDropdown onDropdownWillShow={() => this.onDropdownWillShow1()}
                    onSelect={(defaultIndex) => this.onSelect1(defaultIndex)}
                    options={this.state.arrDays}
                    animated={true}
                    textStyle={styles.dropDMenuText}
                    dropdownTextStyle={styles.dropDMenuText}
                    defaultValue={"Please select a day"} />
                <ModalDropdown options={this.state.chosenDay}
                    textStyle={styles.dropDMenuText}
                    animated={true}
                    dropdownTextStyle={styles.dropDMenuText}
                    defaultValue={"Please select a training"} />
                <ScrollView ref='scrollView' contentContainerStyle={styles.scroller}>
                    <View style={styles.containerLV}>
                        <ListView
                            dataSource={this.state.getInitialState().dataSource}
                            renderRow={this.renderRow}
                            renderSectionHeader={this.renderSectionHeader}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dropDMenuText: {
        color: 'red',
        fontSize: 25,
    },
    containerLV: {
        //flex: 1,
        padding: 8,
        justifyContent: 'center',
        backgroundColor: '#EAEAEA',
    },
    textLVRow: {
        color: 'black',
        fontSize: 18,
        marginLeft: 16,
    },
    textLVSection: {
        color: 'black',
        fontSize: 21,
        fontWeight: "900",
    },
    scroller: {
        //flex: 1,
        //flexDirection: 'row'
    },
})

AppRegistry.registerComponent('DropdownList', () => DropdownList);
