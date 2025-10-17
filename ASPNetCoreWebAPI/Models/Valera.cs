namespace ASPNetCoreWebAPI.Models
{
    public class Valera
    {
        public int Id { get; set; }
        public int Health { get; set; }
        public int Alcohol { get; set; }
        public int Joy { get; set; }
        public int Fatigue { get; set; }
        public int Money { get; set; }

        public Valera()
        {
            Health = 100;
            Alcohol = 0;
            Joy = 0;
            Fatigue = 0;
            Money = 0;
        }

        public void Work()
        {
            if (Alcohol < 50 && Fatigue < 10)
            {
                Joy -= 5;
                Alcohol -= 30;
                if (Alcohol < 0) Alcohol = 0;
                Money += 100;
                Fatigue += 70;
                if (Fatigue > 100) Fatigue = 100;
            }
        }

        public void EnjoyNature()
        {
            Joy += 1;
            if (Joy > 10) Joy = 10;
            Alcohol -= 10;
            if (Alcohol < 0) Alcohol = 0;
            Fatigue += 10;
            if (Fatigue > 100) Fatigue = 100;
        }

        public void DrinkWineAndWatchSeries()
        {
            Joy -= 1;
            Alcohol += 30;
            if (Alcohol > 100) Alcohol = 100;
            Fatigue += 10;
            if (Fatigue > 100) Fatigue = 100;
            Health -= 5;
            if (Health < 0) Health = 0;
            Money -= 20;
        }

        public void GoToBar()
        {
            Joy += 1;
            if (Joy > 10) Joy = 10;
            Alcohol += 60;
            if (Alcohol > 100) Alcohol = 100;
            Fatigue += 40;
            if (Fatigue > 100) Fatigue = 100;
            Health -= 10;
            if (Health < 0) Health = 0;
            Money -= 100;
        }

        public void DrinkWithMarginals()
        {
            Joy += 5;
            if (Joy > 10) Joy = 10;
            Health -= 80;
            if (Health < 0) Health = 0;
            Alcohol += 90;
            if (Alcohol > 100) Alcohol = 100;
            Fatigue += 80;
            if (Fatigue > 100) Fatigue = 100;
            Money -= 150;
        }

        public void SingInMetro()
        {
            Joy += 1;
            if (Joy > 10) Joy = 10;

             if (Alcohol > 40 && Alcohol < 70)
            {
                Money += 50;
            }

            Money += 10;
            Alcohol += 10;
            if (Alcohol > 100) Alcohol = 100;

            Fatigue += 20;
            if (Fatigue > 100) Fatigue = 100;
        }

        public void Sleep()
        {
            // Восстанавливаем здоровье только если алкоголь < 30
            if (Alcohol < 30)
            {
                Health += 90;
                if (Health > 100) Health = 100;
            }

            // Если алкоголь > 70 — минус радость
            if (Alcohol > 70)
            {
                Joy -= 3;
                if (Joy < -10) Joy = -10;
            }

            Alcohol -= 50;
            if (Alcohol < 0) Alcohol = 0;

            // Усталость 
            Fatigue -= 70;
            if (Fatigue < 0) Fatigue = 0;
        }

    }
}
