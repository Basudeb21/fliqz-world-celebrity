import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { FansData } from './faq-data/FansData'
import { CreatorsData } from './faq-data/CreatorsData'
import { PaymentsAndBillingData } from './faq-data/PaymentsAndBillingData'
import { TechnicalSupportData } from './faq-data/TechnicalSupportData'
import { PoliciesAndLegalData } from './faq-data/PoliciesAndLegalData'
import { FliqzWorldWebsiteData } from './faq-data/FliqzWorldWebsiteData'
import { SafetyAndSecurityData } from './faq-data/SafetyAndSecurityData'
import { NotificationSettingsData } from './faq-data/NotificationSettingsData'
import { RefundPoliciesData } from './faq-data/RefundPoliciesData'
import { PrivacyControlsData } from './faq-data/PrivacyControlsData'
import { DeviceCompatibilityData } from './faq-data/DeviceCompatibilityData'
import { ContentPreferenceData } from './faq-data/ContentPreferenceData'
import { AdvancedFilteringOptionsData } from './faq-data/AdvancedFilteringOptionsData'
import { GettingStartedData } from './faq-data/GettingStartedData'

export const helpAndSupportCards = [
    {
        id: 1,
        Icon: Ionicons,
        iconName: "people",
        label: "Fans",
        content: "Learn how fans can follow and interact with creators safely.",
        data: FansData,
        relatedTopics: [2, 3, 14]
    },
    {
        id: 2,
        Icon: Ionicons,
        iconName: "person-circle",
        label: "Creators",
        content: "Guides for creators on managing content, profiles, and growth.",
        data: CreatorsData,
        relatedTopics: [1, 3, 14]
    },
    {
        id: 3,
        Icon: MaterialIcons,
        iconName: "payment",
        label: "Payments & Billing",
        content: "Manage your subscriptions, payments, and billing options.",
        data: PaymentsAndBillingData,
        relatedTopics: [4, 5, 9]
    },
    {
        id: 4,
        Icon: Ionicons,
        iconName: "shield-checkmark",
        label: "Safety & Security",
        content: "Tips to keep your account and data safe from threats.",
        data: SafetyAndSecurityData,
        relatedTopics: [3, 5, 9]
    },
    {
        id: 5,
        Icon: MaterialIcons,
        iconName: "build",
        label: "Technical Support",
        content: "Fix common errors and troubleshoot technical issues.",
        data: TechnicalSupportData,
        relatedTopics: [3, 4, 9]
    },
    {
        id: 6,
        Icon: Ionicons,
        iconName: "document-text",
        label: "Policies & Legal",
        content: "Understand platform rules, policies, and legal guidelines.",
        data: PoliciesAndLegalData,
        relatedTopics: [10, 12, 14]
    },
    {
        id: 7,
        Icon: Ionicons,
        iconName: "phone-portrait",
        label: "Fliqz World Mobile App",
        content: "Get help with installing, updating, and using the app.",
        data: FliqzWorldWebsiteData,
        relatedTopics: [8, 11, 13]
    },
    {
        id: 8,
        Icon: Ionicons,
        iconName: "notifications",
        label: "Notification Settings",
        content: "Customize alerts for messages, activities, and updates.",
        data: NotificationSettingsData,
        relatedTopics: [7, 11, 13]
    },
    {
        id: 9,
        Icon: AntDesign,
        iconName: "reload1",
        label: "Refund Policies",
        content: "Learn how refunds work and how to request one.",
        data: RefundPoliciesData,
        relatedTopics: [3, 4, 5]
    },
    {
        id: 10,
        Icon: Ionicons,
        iconName: "lock-closed",
        label: "Privacy Controls",
        content: "Manage who can see your info and how it’s shared.",
        data: PrivacyControlsData,
        relatedTopics: [6, 12, 14]
    },
    {
        id: 11,
        Icon: MaterialIcons,
        iconName: "devices",
        label: "Device Compatibility",
        content: "Check which devices and platforms support Fliqz.",
        data: DeviceCompatibilityData,
        relatedTopics: [7, 8, 13]
    },
    {
        id: 12,
        Icon: MaterialIcons,
        iconName: "tune",
        label: "Content Preferences",
        content: "Adjust your feed and content viewing preferences.",
        data: ContentPreferenceData,
        relatedTopics: [6, 10, 14]
    },
    {
        id: 13,
        Icon: Feather,
        iconName: "filter",
        label: "Advanced Filtering",
        content: "Use filters to control and personalize your experience.",
        data: AdvancedFilteringOptionsData,
        relatedTopics: [7, 8, 11]
    },
    {
        id: 14,
        Icon: Ionicons,
        iconName: "play-circle",
        label: "Getting Started",
        content: "Step-by-step guide to start using Fliqz quickly.",
        data: GettingStartedData,
        relatedTopics: [3, 6, 10]
    }
]
