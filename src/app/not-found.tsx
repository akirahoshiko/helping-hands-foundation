import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-site max-w-2xl text-center">
        <p className="eyebrow justify-center">Page not found</p>
        <h1 className="mt-4 text-[2.6rem] sm:text-[3.4rem]">We couldn’t find that page.</h1>
        <p className="mt-4 text-[1.08rem] text-muted">The link might be old or have a typo in it.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="primary">Go to the homepage</ButtonLink>
          <ButtonLink href="/causes" variant="outline">See our causes</ButtonLink>
        </div>
      </div>
    </section>
  );
}
