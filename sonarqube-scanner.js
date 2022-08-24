const scanner= require('sonarqube-scanner');
scanner({
        options:{
            "sonar.exclusions":"**/*.test.tsx",
            "sonar.tests":"./src",
            "sonar.test.inclusions":"**/*.test.tsx,**/*.test.ts",
            "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
            "sonar.testExecutionReportPaths": "coverage/test-report.xml",
            "sonar.login":"admin",
            "sonar.password":"admin123"
        },
        serverUrl:"http://localhost:9000",
        login:"admin",
        password:"admin",
        options:{
            "sonar.sources":"./src"
        },
    },
    ()=>process.exit()
);