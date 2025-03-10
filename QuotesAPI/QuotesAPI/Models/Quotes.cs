using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuotesAPI.Models
{
    public class Quote
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int no { get; set; }  // Quote ID

        [Required]
        [StringLength(50)]
        public string quoteType { get; set; } = string.Empty;

        [StringLength(500)]
        public string description { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string sales { get; set; } = string.Empty;  // Sales Person

        [Required]
        public DateTime dueDate { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal premium { get; set; }
    }
}

