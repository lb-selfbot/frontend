import React from "react";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { Footer } from "../../components/Footer.jsx";

import homeStyles from "../../styles/Home.module.css";
import faqStyles from "../../styles/FAQ.module.css";

export default function PrivacyPolicy(props) {
  return (
    <>
      <Box className={homeStyles.landingOuterContainer}>
        <Box className={faqStyles.faqTitleContainer}>
          <Box className={homeStyles.landingInnerContainer}>
            <Box className={faqStyles.faqTitle}>
              <Typography variant="h2" className={homeStyles.landingTitle}>
                <Box className={homeStyles.landingTitleGradient}>
                  Privacy Policy
                </Box>
              </Typography>
            </Box>
          </Box>

          <p>Last updated January 24, 2023</p>
        </Box>

        <Box>
          <svg viewBox="0 0 1920 100.1" display="block">
            <path
              fill="#202020"
              d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
            ></path>
          </svg>
        </Box>
      </Box>

      <Container maxWidth="lg">
        <div id="introduction">
          <p>
            This privacy notice for LightningBot (<strong>"Company ,"</strong> "
            <strong>we,</strong>" "<strong>us,</strong>" or "
            <strong>our</strong>
            "), describes how and why we might collect, store, use, and/or share
            ("<strong>process</strong>") your information when you use our
            services ( "<strong>Services</strong>"), such as when you:
          </p>
          <br />
          <ul>
            <li>
              Visit our website at http://www.lightning-bot.com , or any website
              of ours that links to this privacy notice
            </li>
            <li>
              Engage with us in other related ways, including any sales,
              marketing, or events
            </li>
          </ul>
          <br />
          <p>
            <strong>Questions or concerns?</strong> Reading this privacy notice
            will help you understand your privacy rights and choices. If you do
            not agree with our policies and practices, please do not use our
            Services. If you still have any questions or concerns, please
            contact us at support@lightning-bot.com.
          </p>
        </div>

        <br />
        <br />

        <div id="summary">
          <h2>SUMMARY OF KEY POINTS</h2>
          <br />
          <i>
            This summary provides key points from our privacy notice, but you
            can find out more details about any of these topics by clicking the
            link following each key point or by using our table of contents
            below to find the section you are looking for. You can also click{" "}
            <a href="#toc">here</a> to go directly to our table of contents.
          </i>
          <br />
          <br />
          <strong>What personal information do we process?</strong> When you
          visit, use, or navigate our Services, we may process personal
          information depending on how you interact with LightningBot and the
          Services, the choices you make, and the products and features you use.
          Click <a href="#personalinfo">here</a> to learn more.
          <br />
          <br />
          <strong>Do we process any sensitive personal information?</strong> We
          do not process sensitive personal information.
          <br />
          <br />
          <strong>Do we receive any information from third parties?</strong>We
          do not receive any information from third parties.
          <br />
          <br />
          <strong>How do we process your information?</strong> We process your
          information to provide, improve, and administer our Services,
          communicate with you, for security and fraud prevention, and to comply
          with law. We may also process your information for other purposes with
          your consent. We process your information only when we have a valid
          legal reason to do so. Click <a href="#infouse">here</a> to learn
          more.
          <br />
          <br />
          <strong>
            In what situations and with which parties do we share personal
            information?
          </strong>{" "}
          We may share information in specific situations and with specific
          third parties. Click <a href="#whoshare">here</a> to learn more.
          <br />
          <br />
          <strong>How do we keep your information safe?</strong> We have
          organizational and technical processes and procedures in place to
          protect your personal information. However, no electronic transmission
          over the internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Click <a href="#infosafe">here</a> to learn
          more.
          <br />
          <br />
          <strong>What are your rights?</strong> Depending on where you are
          located geographically, the applicable privacy law may mean you have
          certain rights regarding your personal information. Click{" "}
          <a href="#privacyrights">here</a> to learn more.
          <br />
          <br />
          <strong>How do you exercise your rights?</strong> The easiest way to
          exercise your rights is by contacting us at
          data-request@lightning-bot.com. We will consider and act upon any
          request in accordance with applicable data protection laws.
          <br />
          <br />
          Want to learn more about what LightningBot does with any information
          we collect? Click <a href="#toc">here</a> to review the notice in
          full.
        </div>

        <br />
        <br />

        <div id="toc">
          <h2>TABLE OF CONTENTS</h2>

          <br />

          <ol>
            <li>
              <a href="#infocollect">WHAT INFORMATION DO WE COLLECT?</a>
            </li>
            <li>
              <a href="#infouse">HOW DO WE PROCESS YOUR INFORMATION?</a>
            </li>
            <li>
              <a href="#legalbases">
                WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL
                INFORMATION?
              </a>
            </li>
            <li>
              <a href="#whoshare">
                WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
              </a>
            </li>
            <li>
              <a href="#inforetain">HOW LONG DO WE KEEP YOUR INFORMATION?</a>
            </li>
            <li>
              <a href="#infosafe">HOW DO WE KEEP YOUR INFORMATION SAFE?</a>
            </li>
            <li>
              <a href="#infominors">DO WE COLLECT INFORMATION FROM MINORS?</a>
            </li>
            <li>
              <a href="#privacyrights">WHAT ARE YOUR PRIVACY RIGHTS?</a>
            </li>
            <li>
              <a href="#DNT">CONTROLS FOR DO-NOT-TRACK FEATURES</a>
            </li>
            <li>
              <a href="#caresidents">
                DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
              </a>
            </li>
            <li>
              <a href="#policyupdates">DO WE MAKE UPDATES TO THIS NOTICE?</a>
            </li>
            <li>
              <a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>
            </li>
            <li>
              <a href="#request">
                HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
                YOU?
              </a>
            </li>
          </ol>
        </div>

        <br />
        <br />

        <div id="infocollect">
          <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
        </div>
        <br />
        <br />
        <div id="personalinfo">
          <h3>Personal information you disclose to us</h3>
          <br />
          <strong>
            <em>In Short: </em>
          </strong>
          <em>We collect personal information that you provide to us.</em>
          <br />
          <br />
          We collect personal information that you voluntarily provide to us
          when you register on the Services, express an interest in obtaining
          information about us or our products and Services, when you
          participate in activities on the Services, or otherwise when you
          contact us.
          <br />
          <br />
          <strong>Personal Information Provided by You.</strong> The personal
          information that we collect depends on the context of your
          interactions with us and the Services, the choices you make, and the
          products and features you use. The personal information we collect may
          include the following:
          <br />
          <br />
          <ul>
            <li>usernames</li>
            <li>email addresses</li>
            <li>passwords</li>
          </ul>
        </div>

        <br />

        <div id="sensitiveinfo">
          <strong>Sensitive Information.</strong> We do not process sensitive
          information.
          <br />
          <br />
          <strong>Payment Data.</strong> We may collect data necessary to
          process your payment if you make purchases, such as your payment
          instrument number, and the security code associated with your payment
          instrument. All payment data is stored by PayPal. You may find their
          privacy notice link(s) here:{" "}
          <a
            href="https://www.paypal.com/webapps/mpp/ua/privacy-full"
            target="_blank"
          >
            https://www.paypal.com/webapps/mpp/ua/privacy-full
          </a>
          <br />
          <br />
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information.
        </div>

        <br />
        <br />

        <div>
          <h3>Information automatically collected</h3>
          <br />
          <strong>
            <em>In Short: </em>
          </strong>
          <em>
            Some information — such as your Internet Protocol (IP) address
            and/or browser and device characteristics — is collected
            automatically when you visit our Services.
          </em>
          <br />
          <br />
          We automatically collect certain information when you visit, use, or
          navigate the Services. This information does not reveal your specific
          identity (like your name or contact information) but may include
          device and usage information, such as your IP address, browser and
          device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our Services, and other technical information. This
          information is primarily needed to maintain the security and operation
          of our Services, and for our internal analytics and reporting
          purposes.
          <br />
          <br />
          The information we collect includes:
          <br />
          <br />
          <ul>
            <li>
              <em>Log and Usage Data.</em> Log and usage data is
              service-related, diagnostic, usage, and performance information
              our servers automatically collect when you access or use our
              Services and which we record in log files. Depending on how you
              interact with us, this log data may include your IP address,
              device information, browser type, and settings and information
              about your activity in the Services (such as the date/time stamps
              associated with your usage, pages and files viewed, searches, and
              other actions you take such as which features you use), device
              event information (such as system activity, error reports
              (sometimes called "crash dumps") and hardware settings).
            </li>
          </ul>
        </div>

        <br />
        <br />

        <div id="infouse">
          <h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
          <br />
          <strong>
            <em>In Short: </em>
          </strong>
          <em>
            We process your information to provide, improve, and administer our
            Services, communicate with you, for security and fraud prevention,
            and to comply with law. We may also process your information for
            other purposes with your consent.
          </em>
          <br />
          <br />
          <strong>
            We process your personal information for a variety of reasons,
            depending on how you interact with our Services, including:
          </strong>
          <br />
          <br />
          <ul>
            <li>
              <strong>
                To facilitate account creation and authentication and otherwise
                manage user accounts.{" "}
              </strong>
              We may process your information so you can create and log in to
              your account, as well as keep your account in working order.
            </li>
            <li>
              <strong>
                To save or protect an individual's vital interest.
              </strong>
              We may process your information when necessary to save or protect
              an individual’s vital interest, such as to prevent harm.
            </li>
          </ul>
        </div>

        <br />
        <br />

        <div id="legalbases">
          <h2>
            3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
          </h2>
          <br />
          <strong>
            <em>In Short: </em>
          </strong>
          <em>
            We only process your personal information when we believe it is
            necessary and we have a valid legal reason (i.e., a legal basis) to
            do so under applicable law, like with your consent, to comply with
            laws, to provide you with services to enter into or fulfill our
            contractual obligations, to protect your rights, or to fulfill our
            legitimate business interests.
          </em>
          <br />
          <br />
          <strong>
            <u>
              If you are located in the EU or UK, this section applies to you.
            </u>
          </strong>
          <br />
          <br />
          The General Data Protection Regulation (GDPR) and UK GDPR require us
          to explain the valid legal bases we rely on in order to process your
          personal information. As such, we may rely on the following legal
          bases to process your personal information:
          <br />
          <br />
          <ul>
            <li>
              <strong>Consent. </strong>We may process your information if you
              have given us permission (i.e., consent) to use your personal
              information for a specific purpose. You can withdraw your consent
              at any time. Click <a href="#withdrawconsent">here</a> to learn
              more.
            </li>
            <li>
              <strong>Legal Obligations. </strong>
              We may process your information where we believe it is necessary
              for compliance with our legal obligations, such as to cooperate
              with a law enforcement body or regulatory agency, exercise or
              defend our legal rights, or disclose your information as evidence
              in litigation in which we are involved.
            </li>
            <li>
              <strong>Vital Interests. </strong>
              We may process your information where we believe it is necessary
              to protect your vital interests or the vital interests of a third
              party, such as situations involving potential threats to the
              safety of any person.
            </li>
          </ul>
          <br />
          <br />
          <strong>
            <u>
              <em>
                If you are located in Canada, this section applies to you.
              </em>
            </u>
          </strong>
          <br />
          <br />
          We may process your information if you have given us specific
          permission (i.e., express consent) to use your personal information
          for a specific purpose, or in situations where your permission can be
          inferred (i.e., implied consent). You can withdraw your consent at any
          time. Click <a href="#withdrawconsent">here</a> to learn more.
          <br />
          <br />
          In some exceptional cases, we may be legally permitted under
          applicable law to process your information without your consent,
          including, for example:
          <br />
          <br />
          <ul>
            <li>
              If collection is clearly in the interests of an individual and
              consent cannot be obtained in a timely way
            </li>
            <li>For investigations and fraud detection and prevention</li>
            <li>
              For business transactions provided certain conditions are met
            </li>
            <li>
              If it is contained in a witness statement and the collection is
              necessary to assess, process, or settle an insurance claim
            </li>
            <li>
              For identifying injured, ill, or deceased persons and
              communicating with next of kin
            </li>
            <li>
              If we have reasonable grounds to believe an individual has been,
              is, or may be victim of financial abuse
            </li>
            <li>
              If it is reasonable to expect collection and use with consent
              would compromise the availability or the accuracy of the
              information and the collection is reasonable for purposes related
              to investigating a breach of an agreement or a contravention of
              the laws of Canada or a province
            </li>
            <li>
              If disclosure is required to comply with a subpoena, warrant,
              court order, or rules of the court relating to the production of
              records
            </li>
            <li>
              If it was produced by an individual in the course of their
              employment, business, or profession and the collection is
              consistent with the purposes for which the information was
              produced
            </li>
            <li>
              If the collection is solely for journalistic, artistic, or
              literary purposes
            </li>
            <li>
              If the information is publicly available and is specified by the
              regulations
            </li>
          </ul>
        </div>

        <br />
        <br />

        <div id="whoshare">
          <h2>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
          <br />
          <strong>
            <em>In Short: </em>
          </strong>
          <em>
            We may share information in specific situations described in this
            section and/or with the following third parties.
          </em>
          <br />
          <br />
          We may need to share your personal information in the following
          situations:
          <br />
          <br />
          <ul>
            <li>
              <strong>Business Transfers.</strong>
              We may share or transfer your information in connection with, or
              during negotiations of, any merger, sale of company assets,
              financing, or acquisition of all or a portion of our business to
              another company.
            </li>
          </ul>
        </div>

        <br />
        <br />

        <div id="inforetain">
          <h2>5. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
          <br />
          <strong>
            <em>In Short: </em>
          </strong>
          <em>
            We keep your information for as long as necessary to fulfill the
            purposes outlined in this privacy notice unless otherwise required
            by law.
          </em>
          <br />
          <br />
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than the
          period of time in which users have an account with us.
          <br />
          <br />
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </div>

        <br />
        <br />

        <div id="infosafe">
          <h2>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
          <br />
          <strong>
            <em>In Short: </em>
          </strong>
          <em>
            We aim to protect your personal information through a system of
            organizational and technical security measures.
          </em>
          <br />
          <br />
          We have implemented appropriate and reasonable technical and
          organizational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Although we will do our best to protect your
          personal information, transmission of personal information to and from
          our Services is at your own risk. You should only access the Services
          within a secure environment.
        </div>

        <br />
        <br />

        <div id="infominors">
          <h2>7. DO WE COLLECT INFORMATION FROM MINORS?</h2>
          <br />
          <strong>
            <em>In Short: </em>
          </strong>
          <em>
            We do not knowingly collect data from or market to children under 18
            years of age.
          </em>
          <br />
          <br />
          We do not knowingly solicit data from or market to children under 18
          years of age. By using the Services, you represent that you are at
          least 18 or that you are the parent or guardian of such a minor and
          consent to such minor dependent’s use of the Services. If we learn
          that personal information from users less than 18 years of age has
          been collected, we will deactivate the account and take reasonable
          measures to promptly delete such data from our records. If you become
          aware of any data we may have collected from children under age 18,
          please contact us at privacy@lightning-bot.com.
        </div>

        <br />
        <br />

        <div id="privacyrights">
          <h2>8. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
          <br />
          <strong>
            <em>In Short: </em>
          </strong>
          <em>
            In some regions, such as the European Economic Area (EEA), United
            Kingdom (UK), and Canada, you have rights that allow you greater
            access to and control over your personal information. You may
            review, change, or terminate your account at any time.
          </em>
          <br />
          <br />
          In some regions (like the EEA, UK, and Canada), you have certain
          rights under applicable data protection laws. These may include the
          right (i) to request access and obtain a copy of your personal
          information, (ii) to request rectification or erasure; (iii) to
          restrict the processing of your personal information; and (iv) if
          applicable, to data portability. In certain circumstances, you may
          also have the right to object to the processing of your personal
          information. You can make such a request by contacting us by using the
          contact details provided in the section{" "}
          <a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>{" "}
          below.
          <br />
          <br />
          We will consider and act upon any request in accordance with
          applicable data protection laws.
          <br />
          If you are located in the EEA or UK and you believe we are unlawfully
          processing your personal information, you also have the right to
          complain to your local data protection supervisory authority. You can
          find their contact details here:{" "}
          <a
            href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
            rel="noopener noreferrer"
            target="_blank"
          >
            https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
          </a>
          .
          <br />
          <br />
          If you are located in Switzerland, the contact details for the data
          protection authorities are available here:{" "}
          <a
            href="https://www.edoeb.admin.ch/edoeb/en/home.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            https://www.edoeb.admin.ch/edoeb/en/home.html
          </a>
          .
          <br />
          <br />
          <strong>
            <u>Withdrawing your consent:</u>
          </strong>
          If we are relying on your consent to process your personal
          information, which may be express and/or implied consent depending on
          the applicable law, you have the right to withdraw your consent at any
          time. You can withdraw your consent at any time by contacting us by
          using the contact details provided in the section{" "}
          <a href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>.
          <br />
          <br />
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.
          <br />
          <br />
          <strong>Account Information</strong>
          <br />
          If you would at any time like to review or change the information in
          your account or terminate your account, you can:
          <br />
          <br />
          <ul>
            <li>Contact us using the contact information provided.</li>
            <li>
              Log in to your account settings and update your user account.
            </li>
          </ul>
          <br />
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, we may retain some information in our files to prevent fraud,
          troubleshoot problems, assist with any investigations, enforce our
          legal terms and/or comply with applicable legal requirements.
          <br />
          <br />
          If you have questions or comments about your privacy rights, you may
          email us at privacy@lightning-bot.com.
        </div>

        <br />
        <br />

        <div id="DNT">
          <h2>9. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
          <br />
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track ("DNT") feature or setting you can
          activate to signal your privacy preference not to have data about your
          online browsing activities monitored and collected. At this stage no
          uniform technology standard for recognizing and implementing DNT
          signals has been finalized. As such, we do not currently respond to
          DNT browser signals or any other mechanism that automatically
          communicates your choice not to be tracked online. If a standard for
          online tracking is adopted that we must follow in the future, we will
          inform you about that practice in a revised version of this privacy
          notice.
        </div>

        <br />
        <br />

        <div id="caresidents">
          <h2>10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
          <br />
          <strong>
            <em>In Short: </em>
          </strong>
          <em>
            Yes, if you are a resident of California, you are granted specific
            rights regarding access to your personal information.
          </em>
          <br />
          <br />
          California Civil Code Section 1798.83, also known as the "Shine The
          Light" law, permits our users who are California residents to request
          and obtain from us, once a year and free of charge, information about
          categories of personal information (if any) we disclosed to third
          parties for direct marketing purposes and the names and addresses of
          all third parties with which we shared personal information in the
          immediately preceding calendar year. If you are a California resident
          and would like to make such a request, please submit your request in
          writing to us using the contact information provided below.
          <br />
          <br />
          If you are under 18 years of age, reside in California, and have a
          registered account with Services, you have the right to request
          removal of unwanted data that you publicly post on the Services. To
          request removal of such data, please contact us using the contact
          information provided below and include the email address associated
          with your account and a statement that you reside in California. We
          will make sure the data is not publicly displayed on the Services, but
          please be aware that the data may not be completely or comprehensively
          removed from all our systems (e.g., backups, etc.).
        </div>

        <br />
        <br />

        <div id="policyupdates">
          <h2>11. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
          <br />
          <strong>
            <em>In Short: </em>
          </strong>
          <em>
            Yes, we will update this notice as necessary to stay compliant with
            relevant laws.
          </em>
          <br />
          <br />
          We may update this privacy notice from time to time. The updated
          version will be indicated by an updated "Revised" date and the updated
          version will be effective as soon as it is accessible. If we make
          material changes to this privacy notice, we may notify you either by
          prominently posting a notice of such changes or by directly sending
          you a notification. We encourage you to review this privacy notice
          frequently to be informed of how we are protecting your information.
        </div>

        <br />
        <br />

        <div id="contact">
          <h2>12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
          <br />
          If you have questions or comments about this notice, you may email us
          at privacy@lightning-bot.com.
        </div>

        <br />
        <br />

        <div id="request">
          <h2>
            13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
            YOU?
          </h2>
          <br />
          Based on the applicable laws of your country, you may have the right
          to request access to the personal information we collect from you,
          change that information, or delete it. To request to review, update,
          or delete your personal information, please email us at
          data-request@lightning-bot.com.
        </div>
      </Container>

      <Footer />
    </>
  );
}
