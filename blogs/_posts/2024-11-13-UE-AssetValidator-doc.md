---
layout: post
title: UAssetValidator
categories: [blogs, UE]
tags: [blogs, UE, Doc]
description: >
  A guide on how to use the AssetValidator.
image: /assets/img/2024/va_T.png
noindex: false
---

* [Configuration and Usage](#Configuration-and-Usage)
* [Configure Rules](#Configure-Rules)

## Configuration and Usage
Follow the steps below  
1.  - Add allow validation usecase in project setting  
    - All usecese:
      ```c++
      /** No usecase specified */
      None = 0,
      /** Triggered on user's demand */
      Manual,
      /** A commandlet invoked the validation */
      Commandlet,
      /** Saving a package triggered the validation */
      Save,
      /** Submit dialog triggered the validation */
      PreSubmit,
      /** Triggered by blueprint or c++ */
      Script,
      ```
    - `None` Means all case, it always trigger validation
    - Allow validation usecase empty, same as `None`  
    - `Manual` needs enable validate on save in Editor preferences  
    ![Editor settings](/assets/img/2024/va_s.png)  
1.  - Create a data asset and select `Asset Validation Relus`  
    - Select the `Asset Class` which you want to validation
    - Check [Configure Rules](#Configure-Rules) to define rules
    ![Create rule](/assets/img/2024/va_a.png)
    ![Configure rules](/assets/img/2024/va_c.png)  
1.  - Once the rule asset is saved, it takes effect
    - Find a asset to check your rule is correct or not
    - You may need to test several times to ensure the rule is correct
    ![Validation results](/assets/img/2024/va_r.png)  
## Configure Rules
### Base rule
- `Asset Class` decides which assets the rules apply to
- `Name Format` Format of the asset name, whether it needs prefixes, suffixes, and contains special text  
- `Criteria Entries` Define the properties and values that need to be validated(Click the plus sign to add)  
  - `Attribute Name` Right click property, `Copy Intername Name`(Versions below UE5.5 may not have it)/ `Copy Display Name` ![Copy Attribute Name](/assets/img/2024/va_rc.png)
  - `Values` A property can have multiple values, and you can add multiple entries. As long as one value matches, the validation will pass
    - `Value` A specific value used to compare with the asset's properties
    - `Warning` If selected, the validation will pass even if the above values are different, and it will output the following error message
    - `Error Message` Error message for failed validation, optional
### Advance
