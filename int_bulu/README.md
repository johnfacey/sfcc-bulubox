# GNC Sample Choice int_bulu cartridge

int_bulu cartridge initial setup.

### Installation

Add the int_bulu cartridge to the site path.

Import the `bulu.service.xml` into Administration >  Operations >  Import & Export (merge option)

Import the `system-siteprefs-bulu.xml` into Administration >  Site Development >  Import & Export (merge option)


### Usage

Include Bulu Template in desired location.

Example: 

`<isinclude template="bulu.isml" />`

### Sample Data

Sample Site Pref Data: BuluSetup. 

```
{
	"authUrl": "https://{instance}.bulubox.com/api/oauth2/token/",
	"choiceUrl": "https://{instance}.bulubox.com/api/sample-choice/",
	"apiKey": "{api key}",
	"client_id": "{client_id}",
	"client_secret": "{client_secret}"
}
```

### Build Process - Optional

Currently the code is being build from a Bulu Repository (`NodeJS,React,MobX`). 

Upon getting the latest and making a build the files can be overlayed to the static js/css files located in the `int_bulu` cartridge. 


