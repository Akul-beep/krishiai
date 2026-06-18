"use client";

import { FilePdf } from "@phosphor-icons/react";
import { annualReports, ctas } from "@/lib/content";
import { SectionTag, SerifEm } from "../ui/Typography";
import { Button, LearnMoreLink } from "../ui/Button";
import { AnimateIn, Stagger, StaggerItem } from "../ui/AnimateIn";

export function AnnualReport() {
  return (
    <section id="reports" className="py-[var(--section-y)] bg-surface-muted">
      <div className="container-page">
        <AnimateIn className="mb-12 max-w-2xl">
          <SectionTag>Partnerships &amp; Reporting</SectionTag>
          <h2 className="headline-lg text-[#1a1a1a]">
            Open Reporting On <SerifEm>Field Impact</SerifEm>
          </h2>
          <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
            Transparent pilot data for partners, funders, and agricultural cooperatives.
          </p>
        </AnimateIn>

        <Stagger className="grid md:grid-cols-2 gap-6 max-w-3xl mb-10">
          {annualReports.map((report) => (
            <StaggerItem key={report.year}>
              <article className="card-soft p-8 h-full flex flex-col bg-white">
                <FilePdf className="w-10 h-10 text-primary mb-6" weight="duotone" />
                <span className="text-xs font-medium text-primary mb-2">{report.status}</span>
                <h3 className="text-2xl font-semibold mb-2">{report.year}</h3>
                <p className="text-sm text-on-surface-variant mb-6 flex-1 leading-relaxed">
                  {report.label}
                </p>
                <LearnMoreLink href="#">Download Report</LearnMoreLink>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <AnimateIn className="flex flex-wrap items-center justify-center gap-4">
          <Button href={ctas.fundraise.href} showArrow={false}>
            {ctas.fundraise.label}
          </Button>
          <Button href={ctas.partner.href} variant="ghost" showArrow={false} className="ring-1 ring-outline">
            {ctas.partner.label}
          </Button>
        </AnimateIn>
      </div>
    </section>
  );
}
