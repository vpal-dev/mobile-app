import { BackButton } from '@/components/back-button/back-button';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import Markdown from 'react-native-markdown-display';

const copy = `
# Privacy Policy - Vpal Teacher Assistant

Last Updated: November 28, 2024

## 1. Definitions and Scope

1.1 Throughout this Privacy Policy ("Policy"), "Vpal Teacher Assistant" or "the App" refers to the software application and associated services developed and maintained by Abhishek Anand ("Developer", "we", "our", or "us"). The terms "User", "you", or "your" refer to any individual who downloads, accesses, or utilizes the App.

1.2 This Policy delineates our practices regarding the collection, use, storage, processing, and disclosure of information obtained through your use of the App.

## 2. Information Collection and Processing

2.1 Personal Information
We collect and process the following categories of personal information:
a) Authentication Data: Mobile number, device identifiers, and credentials necessary for account creation and maintenance
b) Professional Information: Educational institution affiliation and teaching credentials
c) Technical Data: Device specifications, operating system information, and App interaction metrics
d) Usage Information: Feature utilisation patterns, AI interaction data, and performance analytics

2.2 Educational Content
The App processes educational content created or uploaded by you, including but not limited to:
a) Lesson plans and educational materials
b) Assessment content and evaluation criteria
c) Educational resources and teaching methodologies
d) AI-assisted content generations and modifications

## 3. Legal Basis for Processing

3.1 We process your information based on the following legal grounds:
a) Performance of our service agreement with you
b) Your explicit consent
c) Legitimate interests in improving and maintaining the App
d) Compliance with applicable Indian laws and regulations

## 4. Data Storage and Security

4.1 Data Localisation
All data is stored on servers located within the territory of India in compliance with applicable data localisation requirements.

4.2 Security Measures
We implement industry-standard technical and organisational measures including:
a) Encryption of data in transit and at rest
b) Access controls and authentication mechanisms
c) Regular security assessments and updates
d) Incident response procedures

## 5. Data Usage and Processing

5.1 Your information is utilised for the following purposes:
a) Providing and maintaining the App's functionality
b) Improving and optimising App performance
c) Developing new features and capabilities
d) Ensuring technical security and preventing misuse
e) Analytics and statistical analysis in anonymized form

5.2 AI Processing
Information processed by our AI systems is:
a) Used solely for educational assistance purposes
b) Anonymised where technically feasible
c) Subject to regular quality and appropriateness reviews
d) Not shared with third parties for commercial purposes

## 6. Data Retention and Deletion

6.1 We retain your information for the duration of your account activity and:
a) Personal data: 90 days after account deletion
b) Usage data: 180 days in anonymised form
c) Educational content: 30 days after account deletion
d) Technical logs: As required by applicable laws

6.2 Data Deletion
Upon account deletion:
a) Personal information is permanently erased within specified timeframes
b) Educational content is removed from active systems
c) Backup data is purged according to retention schedules
d) Anonymised statistical data may be retained indefinitely

## 7. User Rights and Controls

7.1 You possess the following rights regarding your information:
a) Access to personal data
b) Correction of inaccurate information
c) Deletion of personal information
d) Export of user-generated content
e) Withdrawal of processing consent
f) Grievance redressal

## 8. Data Sharing and Disclosure

8.1 We do not sell, rent, or trade your personal information.

8.2 Information may be disclosed under the following circumstances:
a) When required by law or legal process
b) To protect our rights, privacy, safety, or property
c) In connection with a merger, acquisition, or asset sale
d) With your explicit consent

## 9. Grievance Resolution

9.1 For privacy-related concerns:
Contact: Abhishek Anand
Email: support@loonshots.in
Response Time: 24 hours
Resolution Time: 15 days

## 10. Updates to Privacy Policy

10.1 We reserve the right to modify this Policy at any time:
a) Material changes will be notified via email or in-app notifications
b) Continued use after changes constitutes acceptance
c) Previous versions will be archived and available upon request

## 11. Children's Privacy

11.1 The App is intended for use by teaching professionals and:
a) Does not knowingly collect information from individuals under 18
b) Requires users to verify their professional status
c) Prohibits the storage of student personal information

## 12. Compliance Framework

12.1 This Policy complies with:
a) Information Technology Act, 2000
b) Information Technology Rules, 2011
c) Personal Data Protection Bill requirements
d) Other applicable Indian regulations

## Contact Information

For privacy-related inquiries:
Email: support@loonshots.in
Address: 9/6, Lloyd Road, Cooke town, Bangalore 560006
Phone: +91 8431148737


`

export default function PrivacyPolicyScreen() {

  return (
    <SafeAreaView style={{ marginBottom: 100 }}>
      <View style={{ paddingLeft: 20, marginBottom: 30 }}>
        <BackButton />
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ height: '100%', paddingHorizontal: 20 }}
      >
        <Markdown>
          {copy}
        </Markdown>
      </ScrollView>
    </SafeAreaView>
  )
}
