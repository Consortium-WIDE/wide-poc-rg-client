export const environment = {
    production: true,
    rgApiUri: 'https://api.dungeonmaster.wid3-demo.app',
    wideUri: 'https://wid3.app',
    hostUri: 'https://dungeonmaster.wid3-demo.app',
    wideRegisterUserRaidGuild: {
        domain: 'raidguild.org',
        serverPresentationUrl: 'https://wid3.app/present',
        wideApiUri: 'https://api.wid3.app',
        wideConfig: {
            "rpName": "Raid Guild Dungeon Master",
            "serverApiEndpoint": 'https://api.dungeonmaster.wid3-demo.app/wide/uploadData',
            "sourceUri": "https://dungeonmaster.wid3-demo.app",
            "redirectUri": "https://dungeonmaster.wid3-demo.app/signup",
            "logoUri": "https://dungeonmaster.wid3-demo.app/assets/svg/raidguild_logo.svg",
            "iconUri": "https://dungeonmaster.wid3-demo.app/assets/icon.png",
            "requireMessageSignature": true,
            "credential": {
                "type": ["DAOHaus"],
            }
        }
    },
    wideSigninUserRaidGuild: {
        domain: 'raidguild.org',
        serverPresentationUrl: 'https://wid3.app/present',
        wideApiUri: 'https://api.wid3.app',
        wideConfig: {
            "rpName": "Raid Guild Dungeon Master",
            "serverApiEndpoint": 'https://api.dungeonmaster.wid3-demo.app/wide/uploadData',
            "sourceUri": "https://dungeonmaster.wid3-demo.app",
            "redirectUri": "https://dungeonmaster.wid3-demo.app/signin",
            "logoUri": "https://dungeonmaster.wid3-demo.app/assets/svg/raidguild_logo.svg",
            "iconUri": "https://dungeonmaster.wid3-demo.app/assets/icon.png",
            "requireMessageSignature": true,
            "credential": {
                "type": ["Raid Guild Membership"],
            }
        }
    },
    wideClaimEmail: {
        domain: 'raidguild.org',
        serverPresentationUrl: 'https://wid3.app/present',
        wideApiUri: 'https://api.wid3.app',
        wideConfig: {
            "rpName": "Raid Guild Dungeon Master (Profile Editor)",
            "serverApiEndpoint": 'https://api.dungeonmaster.wid3-demo.app/wide/registerProfileData/email',
            "sourceUri": "https://dungeonmaster.wid3-demo.app",
            "redirectUri": "https://dungeonmaster.wid3-demo.app/profile/edit",
            "logoUri": "https://dungeonmaster.wid3-demo.app/assets/svg/raidguild_logo.svg",
            "iconUri": "https://dungeonmaster.wid3-demo.app/assets/icon.png",
            "requireMessageSignature": true,
            "credential": {
                "type": ["oauth"]
            },
            "require": {
                "plainText": [
                    "email"
                ]
            }
        }
    },
    wideClaimDiscord: {
        domain: 'raidguild.org',
        serverPresentationUrl: 'https://wid3.app/present',
        wideApiUri: 'https://api.wid3.app',
        wideConfig: {
            "rpName": "Raid Guild Dungeon Master (Profile Editor)",
            "serverApiEndpoint": 'https://api.dungeonmaster.wid3-demo.app/wide/registerProfileData/discord',
            "sourceUri": "https://dungeonmaster.wid3-demo.app",
            "redirectUri": "https://dungeonmaster.wid3-demo.app/profile/edit",
            "logoUri": "https://dungeonmaster.wid3-demo.app/assets/svg/raidguild_logo.svg",
            "iconUri": "https://dungeonmaster.wid3-demo.app/assets/icon.png",
            "requireMessageSignature": true,
            "credential": {
                "type": ["discord", "oauth"]
            },
            "require": {
                "plainText": [
                    "username"
                ]
            }
        }
    },
    popupConfig: {
        sourceName: 'Raid Guild Dungeon Master',
        logoUri: 'https://dungeonmaster.wid3-demo.app/assets/svg/raidguild_logo.svg'
    }
};
