---
layout: default
title: "How to format an usb drive to fat16 or fat 32 on mac"
description: "How to format an usb drive to fat16 or fat 32 on mac"
lang: english
tags: tutorials
categories: articles
---

Today I want to show you a simple trick that works simply and precise.

All you have to do is to open you terminal and to run the following commands

1. List all the disks inside your computer, to find name of the disk that you want to format in the next step 
`diskutil list`

## Example

```Bash
Macs-MacBook-Pro:~ boobo94$ diskutil list
/dev/disk0 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *251.0 GB   disk0
   1:                        EFI EFI                     209.7 MB   disk0s1
   2:                 Apple_APFS Container disk1         250.8 GB   disk0s2

/dev/disk1 (synthesized):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      APFS Container Scheme -                      +250.8 GB   disk1
                                 Physical Store disk0s2
   1:                APFS Volume Untitled                114.5 GB   disk1s1
   2:                APFS Volume Preboot                 22.8 MB    disk1s2
   3:                APFS Volume Recovery                517.8 MB   disk1s3
   4:                APFS Volume VM                      2.1 GB     disk1s4

/dev/disk2 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *16.3 GB    disk2
   1:                        EFI EFI                     209.7 MB   disk2s1
   2:       Microsoft Basic Data MUZICA                  16.0 GB    disk2s2
```

2. Format your usb drive

`diskutil eraseDisk "MS-DOS FAT16" SOMENAME /dev/disk#`

## Wiki:

+ SOMENAME - here you can put the name that you want to be displayed on you computer in the future
+ FAT16 - if you want to use fat32, please just replace 16 with 32
+ /dev/disk# - replace # with your disk number, for example if I want to format that usb connected to my computer,its name is /dev/disk2