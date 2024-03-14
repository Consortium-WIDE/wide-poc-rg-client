export const environment = {
    production: false,
    rgApiUri: 'http://localhost:3500',
    wideUri: 'http://localhost:4200',
    hostUri: 'http://localhost:4500',
    wideRegisterUserRaidGuild: {
        domain: 'raidguild.org',
        serverPresentationUrl: 'http://localhost:4200/present',
        wideApiUri: 'http://localhost:3000',
        wideConfig: {
            "rpName": "Raid Guild Dungeon Master",
            "serverApiEndpoint": 'http://localhost:3500/wide/uploadData',
            "sourceUri": "http://localhost:4500",
            "redirectUri": "http://localhost:4500/signup",
            "logoUri": "http://localhost:4500/assets/svg/raidguild_logo.svg",
            "iconUri": "http://localhost:4500/assets/icon.png",
            "requireMessageSignature": true,
            "credential": {
                "type": ["DAOHaus"],
            }
        }
    },
    wideSigninUserRaidGuild: {
        domain: 'raidguild.org',
        serverPresentationUrl: 'http://localhost:4200/present',
        wideApiUri: 'http://localhost:3000',
        wideConfig: {
            "rpName": "Raid Guild Dungeon Master",
            "serverApiEndpoint": 'http://localhost:3500/wide/uploadData',
            "sourceUri": "http://localhost:4500",
            "redirectUri": "http://localhost:4500/signin",
            "logoUri": "http://localhost:4500/assets/svg/raidguild_logo.svg",
            "iconUri": "http://localhost:4500/assets/icon.png",
            "requireMessageSignature": true,
            "credential": {
                "type": ["Raid Guild Membership"],
            }
        }
    },
    popupConfig: {
        sourceName: 'Raid Guild Dungeon Master',
        logoUri: 'http://localhost:4500/assets/svg/raidguild_logo.svg'
    }
};
