import { Modal } from '@zigurous/forge-react';
import React from 'react';

interface TermsAndConditionsProps {
  onRequestClose: () => void;
  open: boolean;
}

export default function TermsAndConditions({
  onRequestClose,
  open,
}: TermsAndConditionsProps) {
  return (
    <Modal
      closeOnScrimClick
      onRequestClose={onRequestClose}
      open={open}
      size="lg"
      title="Terms and Conditions"
    >
      <p className="mb-md">
        <i>Last updated on May 16, 2025</i>
      </p>
      <p>
        These terms and conditions ("Agreement") set forth the general terms and
        conditions of your use of the{' '}
        <a
          className="link"
          href="https://zigurous.github.io/osrs-region-analyzer"
          target="_blank"
        >
          zigurous.github.io/osrs-region-analyzer
        </a>{' '}
        website ("Website" or "Service"). This Agreement is legally binding
        between you ("User", "you" or "your") and this Website operator
        ("Operator", "we", "us" or "our"). By accessing and using the Website,
        you acknowledge that you have read, understood, and agree to be bound by
        the terms of this Agreement. If you are entering into this Agreement on
        behalf of a business or other legal entity, you represent that you have
        the authority to bind such entity to this Agreement, in which case the
        terms "User", "you" or "your" shall refer to such entity. If you do not
        have such authority, or if you do not agree with the terms of this
        Agreement, you must not accept this Agreement and may not access and use
        the Website. You acknowledge that this Agreement is a contract between
        you and the Operator, even though it is electronic and is not physically
        signed by you, and it governs your use of the Website.
      </p>
      <br />
      <h2>Accuracy of information</h2>
      <p>
        Occasionally there may be information on the Website that contains
        typographical errors, inaccuracies or omissions. We reserve the right to
        correct any errors, inaccuracies or omissions, and to change or update
        information if any information on the Website is inaccurate at any time
        without prior notice. We undertake no obligation to update, amend or
        clarify information on the Website including except as required by law.
        No specified update or refresh date applied on the Website should be
        taken to indicate that all information on the Website has been modified
        or updated.
      </p>
      <br />
      <h2>Links to other resources</h2>
      <p>
        Although the Website may link to other resources (such as websites,
        mobile applications, etc.), we are not, directly or indirectly, implying
        any approval, association, sponsorship, endorsement, or affiliation with
        any linked resource, unless specifically stated herein. We are not
        responsible for examining or evaluating, and we do not warrant the
        offerings of, any businesses or individuals or the content of their
        resources. We do not assume any responsibility or liability for the
        actions, products, services, and content of any other third parties. You
        should carefully review the legal statements and other conditions of use
        of any resource which you access through a link on the Website. Your
        linking to any other off-site resources is at your own risk.
      </p>
      <br />
      <h2>Intellectual property rights</h2>
      <p>
        "Intellectual Property Rights" means all present and future rights
        conferred by statute, common law or equity in or in relation to any
        copyright and related rights, trademarks, designs, patents, inventions,
        goodwill and the right to sue for passing off, rights to inventions,
        rights to use, and all other intellectual property rights, in each case
        whether registered or unregistered and including all applications and
        rights to apply for and be granted, rights to claim priority from, such
        rights and all similar or equivalent rights or forms of protection and
        any other results of intellectual activity which subsist or will subsist
        now or in the future in any part of the world. This Agreement does not
        transfer to you any intellectual property owned by the Operator or third
        parties, and all rights, titles, and interests in and to such property
        will remain (as between the parties) solely with the Operator. All
        trademarks, service marks, graphics and logos used in connection with
        the Website, are trademarks or registered trademarks of the Operator or
        its licensors. Other trademarks, service marks, graphics and logos used
        in connection with the Website may be the trademarks of other third
        parties. Your use of the Website grants you no right or license to
        reproduce or otherwise use any of the Operator or third party
        trademarks.
      </p>
      <br />
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by applicable law, in no event will the
        Operator, its affiliates, directors, officers, employees, agents,
        suppliers or licensors be liable to any person for any indirect,
        incidental, special, punitive, cover or consequential damages
        (including, without limitation, damages for lost profits, revenue,
        sales, goodwill, use of content, impact on business, business
        interruption, loss of anticipated savings, loss of business opportunity)
        however caused, under any theory of liability, including, without
        limitation, contract, tort, warranty, breach of statutory duty,
        negligence or otherwise, even if the liable party has been advised as to
        the possibility of such damages or could have foreseen such damages. To
        the maximum extent permitted by applicable law, the aggregate liability
        of the Operator and its affiliates, officers, employees, agents,
        suppliers and licensors relating to the services will be limited to an
        amount greater of one dollar or any amounts actually paid in cash by you
        to the Operator for the prior one month period prior to the first event
        or occurrence giving rise to such liability. The limitations and
        exclusions also apply if this remedy does not fully compensate you for
        any losses or fails of its essential purpose.
      </p>
      <br />
      <h2>Severability</h2>
      <p>
        All rights and restrictions contained in this Agreement may be exercised
        and shall be applicable and binding only to the extent that they do not
        violate any applicable laws and are intended to be limited to the extent
        necessary so that they will not render this Agreement illegal, invalid
        or unenforceable. If any provision or portion of any provision of this
        Agreement shall be held to be illegal, invalid or unenforceable by a
        court of competent jurisdiction, it is the intention of the parties that
        the remaining provisions or portions thereof shall constitute their
        agreement with respect to the subject matter hereof, and all such
        remaining provisions or portions thereof shall remain in full force and
        effect.
      </p>
      <br />
      <h2>Changes and amendments</h2>
      <p>
        We reserve the right to modify this Agreement or its terms relating to
        the Website at any time, effective upon posting of an updated version of
        this Agreement on the Website. When we do, we will revise the updated
        date at the top of this page. Continued use of the Website after any
        such changes shall constitute your consent to such changes.
      </p>
      <br />
      <h2>Acceptance of these terms</h2>
      <p>
        You acknowledge that you have read this Agreement and agree to all its
        terms and conditions. By accessing and using the Website you agree to be
        bound by this Agreement. If you do not agree to abide by the terms of
        this Agreement, you are not authorized to access or use the Website.
      </p>
      <br />
      <h2>Contacting us</h2>
      <p>
        If you would like to contact us to understand more about this Agreement
        or wish to contact us concerning any matter relating to it, you may
        email{' '}
        <a className="link" href="mailto:support@zigurous.com" target="_blank">
          support@zigurous.com
        </a>
        .
      </p>
      <br />
    </Modal>
  );
}
