namespace API.Data.Entities
{
    public class Restaurant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PhoneNumber { get; set; }

        public double Rating { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
