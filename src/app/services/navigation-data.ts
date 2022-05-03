import icBaselineCalendarToday from '@iconify/icons-ic/baseline-calendar-today';
import icDoubleArrow from '@iconify/icons-ic/baseline-double-arrow';
import icStockManagement from '@iconify/icons-ic/baseline-gradient';
import iPicking from '@iconify/icons-ic/baseline-local-shipping'; // sharp-shopping-cart-checkout";
import icBaselineSwitchAccess from '@iconify/icons-ic/baseline-switch-access-shortcut';
import icOutlineDashboard from '@iconify/icons-ic/outline-dashboard';
import icRiskManagement from '@iconify/icons-ic/outline-running-with-errors';
import { NavigationLink } from '../interfaces/navigation-item.interface';

//baseline-log-in
export const navigationData: NavigationLink[] = [
    {
        label: 'WebUi::Master',
        icon: icOutlineDashboard,
        id: 'master',
        children: [
            {
                label: 'WebUi::HomePage',
                route: '/homepage',
                id: 'homepage',
                requiredPolicy: ''
            },
            // {
            //     label: 'WebUi::MasterGeneral',
            //     route: '/master-general',
            //     id: 'mastergeneral',
            //     requiredPolicy: ''
            // },
            {
                label: 'WebUi::MasterOrganization',
                route: '/master-organization',
                id: 'masterorganization',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::MasterCustomer',
                route: '/master-customer',
                id: 'mastercustomer',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::MasterItem',
                route: '/master-item',
                id: 'masteritem',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::MasterDevice',
                route: '/master-device',
                id: 'masterdevice',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::MasterQC',
                route: '/master-qc',
                id: 'masterqc',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::MasterUser',
                route: '/master-user',
                id: 'masteruser',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::MenuAuthorityMasterRole',
                route: '/master-role',
                id: 'master-role',
                requiredPolicy: ''
            },
            // {
            //     label: 'WebUi::UserMasterWithDataAutority',
            //     route: '/master-user-data',
            //     id: 'user-master-data',
            //     requiredPolicy: ''
            // },
            {
                label: 'WebUi::MasterDevice',
                route: '/master-device',
                id: 'masterdevice',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::GeneralCodeMaster',
                route: '/master-general',
                id: 'mastergeneral',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::MaterialItemMaster',
                route: '/master-item',
                id: 'master-item',
                requiredPolicy: ''
            },
            // {
            //     label: 'WebUi::IqcGuideManualMaster',
            //     route: '/guide-manual-master',
            //     id: 'guide-manual-master',
            //     requiredPolicy: ''
            // },
            {
                label: 'WebUi::LanguageSetting',
                route: '/language-setting',
                id: 'langsetting',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::LanguageTranslate',
                route: '/language-translate',
                id: 'langtranslate',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::BOMMaster',
                route: '/bom-master',
                id: 'bom-master',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::FactoryWorkCalendar',
                route: '/master-calendar',
                id: 'factory-work-calendar',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::SupplierBuyerMaster',
                route: '/master-customer',
                id: 'mastercustomer',
                requiredPolicy: ''
            },
            // {
            //     label: 'WebUi::MasterCustomer',
            //     route: '/master-customer',
            //     id: 'mastercustomer',
            //     requiredPolicy: ''
            // },
            // {
            //     label: 'WebUi::MasterItem',
            //     route: '/master-item',
            //     id: 'masteritem',
            //     requiredPolicy: ''
            // },
            {
                label: 'WebUi::MasterQC',
                route: '/master-qc',
                id: 'masterqc',
                requiredPolicy: ''
            },
            // {
            //     label: 'WebUi::MasterDelivery',
            //     route: '/master-delivery',
            //     id: 'masterdelivery',
            //     requiredPolicy: ''
            // },
            {
                label: 'WebUi::UserMenuAutority',
                route: '/user-master-auth',
                id: 'user-master-auth',
                requiredPolicy: ''
            },
            // {
            //     label: 'WebUi::DeviceMaster',
            //     route: '/device-master',
            //     id: 'device-master',
            //     requiredPolicy: ''
            // },

            // {
            //     label: 'WebUi::ComponentWipMaster',
            //     route: '/component-master',
            //     id: 'component-master',
            //     requiredPolicy: ''
            // },
            // {
            //     label: 'WebUi::FinishedGoodsMaster',
            //     route: '/finished-goods-master',
            //     id: 'finished-goods-master',
            //     requiredPolicy: ''
            // },
            // {
            //     label: 'WebUi::FactoryWorkCalendar',
            //     route: '/master-calendar',
            //     id: 'factory-work-calendar',
            //     requiredPolicy: ''
            // },
            // {
            //     label: 'WebUi::MappingLocationItems',
            //     route: '/mapping-location-items',
            //     id: 'Mapping Location & Items',
            //     requiredPolicy: 'mapping-location'
            // },
            // {
            //     label: 'WebUi::InterfaceDocumentMasterwithERP',
            //     route: '/doc',
            //     id: 'Interface Document Master with ERP',
            //     requiredPolicy: 'doc'
            // },
            // {
            //     label: 'WebUi::RegisterLot',
            //     route: '/mapping-location',
            //     id: 'Mapping Location',
            //     requiredPolicy: ''
            // }
        ]
    },
    {
        label: 'WebUi::Planning',
        icon: icBaselineCalendarToday,
        id: 'planning',
        children: [
            {
                label: 'WebUi::WarningInboundDashboard',
                route: '/risk-warning',
                id: 'risk-warning',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::SetupProductionPlan',
                route: '/production-plan',
                id: 'productionPlan',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::DueItemsToInLine',
                route: '/due-items',
                id: 'due-items',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::SimulationWarningItem',
                route: 'warning-item',
                id: 'Warning Item which is not enough',
                requiredPolicy: 'warning-item'
            }
        ]
    },

    {
        label: 'WebUi::Inbound',
        icon: icDoubleArrow,
        id: 'inbound',
        children: [
            {
                label: 'WebUi::UploardPickingDeliveryList',
                route: '/uploard-picking',
                id: 'uploard-picking',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::real-time Inbound Control Dashboard : Ground zone',
                route: '/inbound-host',
                id: 'real-time-inbound',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Choose Inbounding Items in Nidec on M : Ground zone',
                route: 'choose-inbounding-items',
                id: 'choose-inbounding-items',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Create& Register Box QR',
                route: 'create-register',
                id: 'create-register',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Choose Keeping Items on M : Warehouse keeping zone after QC',
                route: 'choose-keeping-items',
                id: 'choose-keeping-items',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Emergency Inbound Items',
                route: 'emergency-inbound',
                id: 'emergency-inbound',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Return Item',
                route: 'return-item',
                id: 'return-item',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Analysis of Items which will be inbounded',
                route: 'analysis-of-tems',
                id: 'analysis-of-tems',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Inbound Status View',
                route: 'inbound-status-view',
                id: 'inbound-status-view',
                requiredPolicy: ''
            }
        ]
    },

    {
        label: 'WebUi::IQC',
        icon: icBaselineSwitchAccess,
        id: 'iqc',
        children: [
            {
                label: 'WebUi::QcResult',
                route: 'qc-result',
                id: 'qc-result',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::CreateBoxQR',
                route: 'create-box',
                id: 'create-box',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::QcDashBoard',
                route: 'qc-real-time',
                id: 'qc-real-time',
                requiredPolicy: ''
            }
        ]
    },

    {
        label: 'WebUi::Picking',
        icon: iPicking,
        id: 'picking',
        children: [
            {
                label: 'WebUi::Request Item to Line',
                route: '/request-item-line',
                id: 'request-item-line',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Request Item to Outsourcing',
                route: 'request-item-outsourcing',
                id: 'request-item-outsourcing',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Confirm Item',
                route: 'confirm-item',
                id: 'confirm-item',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Item Picking Scanning to Pick',
                route: 'item-picking-scanning',
                id: 'item-picking-scanning',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Pick-Scan Item to Outsourcing',
                route: 'pick-scan-item',
                id: 'pick-scan-item',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Auto Create Item Outgoing from Cleaning Room',
                route: 'auto-create-item',
                id: 'auto-create-item',
                requiredPolicy: ''
            }
        ]
    },
    {
        label: 'WebUi::Stock Magt',
        icon: icStockManagement,
        id: 'stock-magt',
        children: [
            {
                label: 'WebUi::Item Move Location in warehouse',
                route: 'item-move-location',
                id: 'item-move-location',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Change Status of Item',
                route: 'change-status',
                id: 'change-status',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Pick to Other Case : Disuse, Broken and Other Reason',
                route: 'pick-to-other',
                id: 'pick-to-other',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Update Item Qty(+/-) : Checking Item Qty by Reason',
                route: 'update-item-qty',
                id: 'update-item-qty',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Return Item to Warehouse from in-Line',
                route: 'return-item',
                id: 'return-item',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Registor Lot infomaton',
                route: 'mapping-location',
                id: 'registor lot',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Lot Listboard',
                route: 'mapping-location-items',
                id: 'lot-listboard',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Create Finished Goods Boxing',
                route: 'create-finished-goods',
                id: 'create-finished-goods',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Clean Room Stock Status',
                route: 'clean-room-stock',
                id: 'clean-room-stock',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Item Location Search',
                route: 'item-location-search',
                id: 'item-location-search',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Curent Stock Report(5)',
                route: 'current-stock-report',
                id: 'current-stock-report',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Repoting System',
                route: 'repoting-system',
                id: 'repoting-system',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Warehouse real-time Dashboard',
                route: 'warehouse-real-time',
                id: 'warehouse-real-time',
                requiredPolicy: ''
            }
        ]
    },
    {
        label: 'WebUi::Risk Management',
        icon: icRiskManagement,
        id: 'risk-management',
        children: [
            {
                label: 'WebUi::Risk Warning of Item which cannot be received on time',
                route: 'Risk-Warning',
                id: 'Risk Warning of Item which cannot be received on time',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Warning Item which is not enough',
                route: 'Warning-Item',
                id: 'Warning Item which is not enough',
                requiredPolicy: ''
            },
            {
                label: 'WebUi::Item Aging(days) Analysis : How long stay in warehouse by item',
                route: 'Item-Aging',
                id: 'Item Aging(days) Analysis : How long stay in warehouse by item',
                requiredPolicy: ''
            }
        ]
    }
];
