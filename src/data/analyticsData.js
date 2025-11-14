import { Colors } from "../constants";
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export const overviewDataArray = [
    {
        id: 1,
        head: "Growth\nRate",
        numeric: "3.80%",
        Icon: Foundation,
        iconName: "graph-trend",
        color: Colors.THEME,
        iconSize: 18
    },
    {
        id: 2,
        head: "Daily\nFollowers",
        numeric: "279",
        Icon: FontAwesome5,
        iconName: "users",
        color: Colors.GREEN,
        iconSize: 16
    },
    {
        id: 3,
        head: "Weekly\nFollowers",
        numeric: "1,954",
        Icon: Entypo,
        iconName: "calendar",
        color: Colors.LIGHT_BLUE,
        iconSize: 18

    },
    {
        id: 4,
        head: "Steady\nGrowth",
        numeric: "88.37%",
        Icon: FontAwesome,
        iconName: "pie-chart",
        color: Colors.PURPLE,
        iconSize: 17
    }
]


export const growthDataArray = [
    {
        id: 1,
        head: "Monthly\nGrowth",
        numeric: "8.2%",
        Icon: Feather,
        iconName: "percent",
        color: Colors.LIGHT_BLUE,
        iconSize: 16,
        growthRate: "1.2% from last month",
        growthType: "inc"
    },
    {
        id: 2,
        head: "Daily\nnGrowth",
        numeric: "312",
        Icon: Entypo,
        iconName: "calendar",
        color: Colors.YELLOW,
        iconSize: 16,
        growthRate: "24 from last week",
        growthType: "dec"
    },
    {
        id: 3,
        head: "Projected\nGrowth",
        numeric: "9,360",
        Icon: Fontisto,
        iconName: "share",
        color: Colors.PURPLE,
        iconSize: 12,
        growthRate: "860 from last month",
        growthType: "inc"
    },
]

export const engagementDataArray = [
    {
        id: 1,
        head: "Engagement\nRate",
        numeric: "3.80%",
        Icon: MaterialIcons,
        iconName: "favorite",
        color: Colors.LIGHT_BLUE,
        iconSize: 16,
        growthRate: "0.6% from last week",
        growthType: "inc"
    },
    {
        id: 2,
        head: "Average\nLike",
        numeric: "312",
        Icon: Fontisto,
        iconName: "like",
        color: Colors.YELLOW,
        iconSize: 16,
        growthRate: "142 from last week",
        growthType: "inc"
    },
    {
        id: 3,
        head: "Average\nComment",
        numeric: "9,360",
        Icon: FontAwesome5,
        iconName: "comment-dots",
        color: Colors.PINK,
        iconSize: 14,
        growthRate: "32 from last month",
        growthType: "dec"
    },
]

export const postsDataArray = [
    {
        id: 1,
        head: "Engagement\nLike",
        numeric: "1,858",
        Icon: MaterialIcons,
        iconName: "favorite",
        color: Colors.LIGHT_BLUE,
        iconSize: 16,
        growthRate: "12% from last week",
        growthType: "inc"
    },
    {
        id: 2,
        head: "Average\nComment",
        numeric: "458",
        Icon: FontAwesome5,
        iconName: "comment-dots",
        color: Colors.YELLOW,
        iconSize: 16,
        growthRate: "8% from last week",
        growthType: "inc"
    },
    {
        id: 3,
        head: "Average\nShare",
        numeric: "263",
        Icon: Fontisto,
        iconName: "share",
        color: Colors.PINK,
        iconSize: 14,
        growthRate: "5% from last week",
        growthType: "inc"
    },
]
