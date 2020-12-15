/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export declare type AboutusSection = {
  description?: string;
  logos?: string[];
};

export declare type HeaderSection = {
  description?: string;
  useImage: boolean;
  background: string;
};

export declare type Settings = {
  primaryColor: string;
  secondaryColor: string;
  useIcon: boolean;
  icon: string;
};

export declare type TextSection = {
  description?: string;
};

export declare type ExternalSetting = {
  useExternal: boolean;
  url: string;
};

export declare type ListSection = {
  description?: string;
  requirements?: RequirementField[];
  models?: string[];
};

export declare type RequirementField = {
  isMandatory: boolean;
  description: string;
};

export declare type FormSectionField = {
  name: string;
  isNeeded: boolean;
};

export declare type FormSection = {
  description?: string;
  fields?: FormSectionField[];
};
