export const DICT = {
    dict1: [
        {
            closedCycleCode: 'AP',
            closedCycleName: '申请'
        },
        {
            closedCycleCode: 'SC',
            closedCycleName: '登记'
        },
        {
            closedCycleCode: 'SHOOT',
            closedCycleName: '拍片'
        },
        {
            closedCycleCode: 'RP',
            closedCycleName: '报告'
        },
        {
            closedCycleCode: 'SC1',
            closedCycleName: '登记1'
        },
        {
            closedCycleCode: 'AUDIT1',
            closedCycleName: '审核1',
            isBranch: true
        },
        {
            closedCycleCode: 'AUDIT',
            closedCycleName: '审核',
            isBranch: true
        },
        {
            closedCycleCode: 'RPT',
            closedCycleName: '报告打印',
            isBranch: true
        },
        // {
        //     closedCycleCode: 'hasAdd',
        //     closedCycleName: '有才加',
        //     isBranch: true,
        //     isHasAdd: true
        // },
        {
            closedCycleCode: 'cv',
            closedCycleName: '危急值',
            isBranch: true,
            isHasAdd: true,
            branches: [
                {
                    code: 'cvap',
                    name: '危急值申请',
                    isCv: true
                },
                {
                    code: 'cvexc',
                    name: '危急值执行'
                },
                {
                    code: 'cvdone',
                    name: '危急值完成',
                    isCv: true
                }
            ]
        },
        // {
        //     closedCycleCode: 'lastcheck',
        //     closedCycleName: '最后确认',
        //     isBranch: false
        // }
    ],
    dict2: [
        {
            closedCycleCode: 'BLDAP',
            closedCycleName: '用血申请'
        },
        {
            closedCycleCode: 'BLDVERIFY',
            closedCycleName: '用血审批'
        },
        {
            closedCycleCode: 'BLDAPRECEIVE',
            closedCycleName: '用血申请单接收'
        },
        {
            closedCycleCode: 'BLDMATCHAP',
            closedCycleName: '交叉配血申请'
        },
        {
            closedCycleCode: 'BLDMATCHNC',
            closedCycleName: '交叉配血护士确认'
        },
        {
            closedCycleCode: 'BLDMATCHPRT',
            closedCycleName: '交叉配血条码打印'
        },
        {
            closedCycleCode: 'BLDMATCHCOLL',
            closedCycleName: '交叉配血标本采集'
        },
        {
            closedCycleCode: 'BLDMATCHTRANS',
            closedCycleName: '交叉配血标本运送'
        },
        {
            closedCycleCode: 'BLDMATCHARR',
            closedCycleName: '交叉配血标本送达'
        },
        {
            closedCycleCode: 'BLDMATCH',
            closedCycleName: '配血'
        },
        {
            closedCycleCode: 'BLDDISP',
            closedCycleName: '发血',
            isBranch: true,
            branches: [
                {
                    code: 'BLDRECYCLE',
                    name: '血袋回收'
                }
            ],
            sub_branches: [
                {
                    code: 'BLDBOOK',
                    name: '血液预定'
                },
                {
                    code: 'BLDSTOREIN',
                    name: '血液入库'
                }
            ]
        },
        {
            closedCycleCode: 'BLDMATCHVER',
            closedCycleName: '血液核对',
            isBranch: true
        },
        {
            closedCycleCode: 'BLDINFUSIONST',
            closedCycleName: '开始输血',
            isBranch: true
        },
        {
            closedCycleCode: 'BLDINSPECT',
            closedCycleName: '输血巡视',
            isBranch: true
        },
        {
            closedCycleCode: 'BLDINFUSIONEND',
            closedCycleName: '输血结束',
            isBranch: true
        },
        {
            closedCycleCode: 'ADVREFLECT',
            closedCycleName: '不良反应'
        }
    ]
}