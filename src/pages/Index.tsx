import BonusCard from "@/components/BonusCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const platforms = [
  {
    platformName: "8855BET",
    bonusAmount: "R$ 18",
    link: "https://211.43.149.60/?id=669250336"
  },
  {
    platformName: "166BET",
    bonusAmount: "R$ 18",
    link: "https://211.43.149.101/?id=39409456"
  },
  {
    platformName: "333BET",
    bonusAmount: "R$ 18",
    link: "https://333bet55.com/?id=10955223"
  },
  {
    platformName: "3355BET",
    bonusAmount: "R$ 18",
    link: "https://www.3355bet43.com/?id=33118435"
  },
  {
    platformName: "234BET",
    bonusAmount: "R$ 18",
    link: "https://br234.cc/?id=74973234"
  },
  {
    platformName: "777TIGER",
    bonusAmount: "R$ 18",
    link: "https://ee777tiger.com/?id=34647408"
  },
  {
    platformName: "CNCBET",
    bonusAmount: "R$ 18",
    link: "https://tat.bet/?id=35919155"
  },
  {
    platformName: "669BET",
    bonusAmount: "R$ 18",
    link: "https://669bet24.com/?id=52357202"
  },
  {
    platformName: "GTWIN",
    bonusAmount: "R$ 18",
    link: "https://211.43.149.71:5001/?id=106045302"
  },
  {
    platformName: "23BET",
    bonusAmount: "R$ 18",
    link: "https://211.43.149.99:5001/?id=236637468"
  },
  {
    platformName: "5588BET",
    bonusAmount: "R$ 18",
    link: "https://138.113.171.11/?id=84953782"
  },
  {
    platformName: "XJWIN",
    bonusAmount: "R$ 18",
    link: "https://www.xjwin43.com/?id=876552436"
  },
  {
    platformName: "939BET",
    bonusAmount: "R$ 18",
    link: "https://www.939bet43.com/?id=134576640"
  },
  {
    platformName: "9NBET",
    bonusAmount: "R$ 18",
    link: "https://www.9nbet22.com/?id=98596261"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-4 py-6 sm:container sm:py-12">
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
          {platforms.map((platform, index) => (
            <BonusCard
              key={platform.platformName}
              platformName={platform.platformName}
              bonusAmount={platform.bonusAmount}
              link={platform.link}
              index={index}
            />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
