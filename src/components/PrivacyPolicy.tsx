import { Modal } from '@zigurous/forge-react';
import React from 'react';

interface PrivacyPolicyProps {
  onRequestClose: () => void;
  open: boolean;
}

export default function PrivacyPolicy({
  onRequestClose,
  open,
}: PrivacyPolicyProps) {
  return (
    <Modal
      closeOnScrimClick
      onRequestClose={onRequestClose}
      open={open}
      size="xl"
      title="Privacy Policy"
    >
      <p className="mb-md">
        <i>Last updated on May 16, 2025</i>
      </p>
      <p className="text-subtle">
        This privacy policy ("Policy") describes how the personally identifiable
        information ("Personal Information") you may provide on the{' '}
        <a
          className="link"
          href="https://osrs.zigurous.com/region-analyzer"
          target="_blank"
        >
          osrs.zigurous.com/region-analyzer
        </a>{' '}
        website ("Website" or "Service") is collected, protected and used. It
        also describes the choices available to you regarding our use of your
        Personal Information and how you can access and update this information.
        This Policy is a legally binding agreement between you ("User", "you" or
        "your") and this Website operator ("Operator", "we", "us" or "our").
      </p>
      <br />
      <h2>Automatic collection of information</h2>
      <p className="text-subtle">
        When you open the Website, our servers automatically record information
        that your browser sends. This data may include information such as your
        device's IP address, browser type and version, operating system type and
        version, language preferences or the webpage you were visiting before
        you came to the Website, pages of the Website that you visit, the time
        spent on those pages, information you search for on the Website, access
        times and dates, and other statistics. Information collected
        automatically is used only to identify potential cases of abuse and
        establish statistical information regarding the usage and traffic of the
        Website. This statistical information is not otherwise aggregated in
        such a way that would identify any particular user of the system.
      </p>
      <br />
      <h2>Your rights</h2>
      <p className="text-subtle">
        You may exercise certain rights regarding your information processed by
        us. In particular, you have the right to do the following:
      </p>
      <ul className="mt-md list-bullet list-indent text-subtle">
        <li>
          You have the right to withdraw consent where you have previously given
          your consent to the processing of your information.
        </li>
        <li>
          You have the right to object to the processing of your information if
          the processing is carried out on a legal basis other than consent.
        </li>
        <li>
          You have the right to learn if information is being processed by us,
          obtain disclosure regarding certain aspects of the processing and
          obtain a copy of the information undergoing processing.
        </li>
        <li>
          You have the right to verify the accuracy of your information and ask
          for it to be updated or corrected.
        </li>
        <li>
          You have the right, under certain circumstances, to restrict the
          processing of your information, in which case, we will not process
          your information for any purpose other than storing it.
        </li>
        <li>
          You have the right, under certain circumstances, to obtain the erasure
          of your Personal Information from us.
        </li>
        <li>
          You have the right to receive your information in a structured,
          commonly used and machine readable format and, if technically
          feasible, to have it transmitted to another controller without any
          hindrance. This provision is applicable provided that your information
          is processed by automated means and that the processing is based on
          your consent, on a contract which you are part of or on
          pre-contractual obligations thereof.
        </li>
      </ul>
      <br />
      <h2>California privacy rights</h2>
      <p className="text-subtle">
        In addition to the rights as explained in this Policy, California
        residents who provide Personal Information (as defined in the statute)
        to obtain products or services for personal, family, or household use
        are entitled to request and obtain from us, once a calendar year,
        information about the Personal Information we shared, if any, with other
        businesses for marketing uses. If applicable, this information would
        include the categories of Personal Information and the names and
        addresses of those businesses with which we shared such personal
        information for the immediately prior calendar year (e.g., requests made
        in the current year will receive information about the prior year). To
        obtain this information please contact us.
      </p>
      <br />
      <h2>How to exercise these rights</h2>
      <p className="text-subtle">
        Any requests to exercise your rights can be directed to the Operator
        through the contact details provided in this document. Please note that
        we may ask you to verify your identity before responding to such
        requests. Your request must provide sufficient information that allows
        us to verify that you are the person you are claiming to be or that you
        are the authorized representative of such person. You must include
        sufficient details to allow us to properly understand the request and
        respond to it. We cannot respond to your request or provide you with
        Personal Information unless we first verify your identity or authority
        to make such a request and confirm that the Personal Information relates
        to you.
      </p>
      <br />
      <h2>Privacy of children</h2>
      <p className="text-subtle">
        We recognize the need to provide further privacy protections with
        respect to Personal Information we may collect from children and take
        many special precautions to protect the privacy of children. We do not
        require any Personal Information from them at any time. We encourage
        children to consult with their parents before submitting any information
        to any online resource. We believe parents should be involved in the
        online activities of their children and suggest that parents do their
        best to provide their children with a safe and friendly online
        environment.
      </p>
      <br />
      <h2>Do Not Track signals</h2>
      <p className="text-subtle">
        Some browsers incorporate a Do Not Track feature that signals to
        websites you visit that you do not want to have your online activity
        tracked. Tracking is not the same as using or collecting information in
        connection with a website. For these purposes, tracking refers to
        collecting personally identifiable information from consumers who use or
        visit a website or online service as they move across different websites
        over time. The Website do not track its visitors over time and across
        third party websites. However, some third party sites may keep track of
        your browsing activities when they serve you content, which enables them
        to tailor what they present to you.
      </p>
      <br />
      <h2>Links to other resources</h2>
      <p className="text-subtle">
        The Website contain links to other resources that are not owned or
        controlled by us. Please be aware that we are not responsible for the
        privacy practices of such other resources or third parties. We encourage
        you to be aware when you leave the Website and to read the privacy
        statements of each and every resource that may collect Personal
        Information.
      </p>
      <br />
      <h2>Changes and amendments</h2>
      <p className="text-subtle">
        We reserve the right to modify this Policy or its terms relating to the
        Website at any time, effective upon posting of an updated version of
        this Policy on the Website. When we do, we will revise the updated date
        at the top of this page. Continued use of the Website after any such
        changes shall constitute your consent to such changes. However, we will
        not, without your consent, use your Personal Information in a manner
        materially different than what was stated at the time your Personal
        Information was collected.
      </p>
      <br />
      <h2>Acceptance of this policy</h2>
      <p className="text-subtle">
        You acknowledge that you have read this Policy and agree to all its
        terms and conditions. By accessing and using the Website you agree to be
        bound by this Policy. If you do not agree to abide by the terms of this
        Policy, you are not authorized to access or use the Website.
      </p>
      <br />
      <h2>Contacting us</h2>
      <p className="text-subtle">
        If you would like to contact us to understand more about this Policy or
        wish to contact us concerning any matter relating to individual rights
        and your Personal Information, you may email{' '}
        <a className="link" href="mailto:support@zigurous.com" target="_blank">
          support@zigurous.com
        </a>
        .
      </p>
      <br />
    </Modal>
  );
}
