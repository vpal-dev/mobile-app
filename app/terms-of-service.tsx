import { BackButton } from '@/components/back-button/back-button';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import Markdown from 'react-native-markdown-display';

const copy = `

# Terms of Service - Vpal Teacher Assistant

Last Updated: November 28, 2024

## 1. Definitions and Interpretations

For the purposes of these Terms of Service ("Terms"), "Vpal Teacher Assistant" or "the App" refers to the software application and all associated services developed and maintained by Abhishek Anand ("Developer", "Licensor", "we", "our", or "us"). The term "User" or "you" refers to any individual who downloads, accesses, or utilises the App in any capacity.

## 2. Grant of License

Subject to these Terms, we hereby grant you a revocable, non-exclusive, non-transferable, limited license to utilise the App solely for educational purposes in accordance with its intended functionality. This license is contingent upon your continued compliance with all terms herein and may be revoked at our sole discretion without prior notice.

## 3. Intellectual Property Rights

3.1 The App, including but not limited to its source code, features, graphics, user interface, scripts, texts, logos, and AI algorithms ("Intellectual Property"), is protected by copyright and other intellectual property laws. All rights, title, and interest in and to the Intellectual Property shall remain exclusively with the Developer.

3.2 Any attempt to decompile, reverse engineer, disassemble, modify, or create derivative works of the App constitutes a material breach of these Terms and may result in immediate termination of your license and legal action.

## 4. User Content and Data Rights

4.1 While you retain ownership of content created through the App ("User Content"), you hereby grant us a worldwide, royalty-free, perpetual, irrevocable, non-exclusive license to use, reproduce, modify, adapt, publish, translate, and distribute such User Content for the purpose of operating and improving the App.

4.2 You represent and warrant that you possess all necessary rights and authorizations to grant the aforementioned license and that User Content does not infringe upon any third-party rights.

## 5. AI Services and Limitations

5.1 The App's artificial intelligence features are provided on an "as available" basis and may be modified, suspended, or terminated at our sole discretion. The Developer makes no representations or warranties regarding the accuracy, reliability, or appropriateness of AI-generated content.

5.2 You acknowledge and agree that AI-generated content may contain errors, inconsistencies, or inappropriate material, and you assume all risks associated with its use in educational contexts.

## 6. Disclaimers and Limitations of Liability

6.1 The App is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.

6.2 Under no circumstances shall the Developer be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses arising out of or in connection with the use or inability to use the App.

## 7. Indemnification

You agree to defend, indemnify, and hold harmless the Developer from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney fees and costs, arising out of or in any way connected with your access to or use of the App.

## 8. Data Collection and Privacy

8.1 The Developer reserves the right to collect, store, and process user data in accordance with the Privacy Policy, which is incorporated by reference into these Terms.

8.2 You expressly consent to the collection and processing of your personal information and User Content as described in the Privacy Policy.

## 9. Termination

9.1 The Developer reserves the right, at its sole discretion, to suspend or terminate your access to the App without prior notice or liability for any reason, including but not limited to a breach of these Terms.

9.2 Upon termination, all provisions of these Terms which by their nature should survive termination shall survive, including without limitation ownership provisions, warranty disclaimers, indemnification, and limitations of liability.

## 10. Governing Law and Jurisdiction

These Terms shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Kolkata, India.

## 11. Severability and Waiver

11.1 If any provision of these Terms is found to be unenforceable or invalid, such provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.

11.2 The failure of the Developer to enforce any right or provision of these Terms shall not be deemed a waiver of such right or provision.

## 12. Modifications

The Developer reserves the right to modify or replace these Terms at any time at its sole discretion. Continued use of the App following any such changes shall constitute your consent to such changes.

## Contact Information

For any queries regarding these Terms, please contact us at support@loonshots.in


`

export default function TermsofServiceScreen() {

  return (
    <SafeAreaView>
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
