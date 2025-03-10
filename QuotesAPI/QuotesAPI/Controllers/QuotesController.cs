using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuotesAPI.Data;
using QuotesAPI.Models;

namespace QuotesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<QuotesController> _logger;

        public QuotesController(ApplicationDbContext context, ILogger<QuotesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Quotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
        {
            _logger.LogInformation("Getting all quotes");
            return await _context.Quotes.OrderBy(q => q.no).ToListAsync();
        }

        // GET: api/Quotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quote>> GetQuote(int id)
        {
            _logger.LogInformation("Getting quote with ID: {Id}", id);

            var quote = await _context.Quotes.FindAsync(id);

            if (quote == null)
            {
                _logger.LogWarning("Quote with ID: {Id} not found", id);
                return NotFound($"Quote with ID {id} not found");
            }

            return quote;
        }

        // PUT: api/Quotes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuote(int id, Quote quote)
        {
            _logger.LogInformation("Updating quote with ID: {Id}", id);

            if (id != quote.no)
            {
                _logger.LogWarning("ID mismatch: URL ID {UrlId} doesn't match body ID {BodyId}", id, quote.no);
                return BadRequest("ID in URL must match Quote No in request body");
            }

            _context.Entry(quote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation("Quote with ID: {Id} updated successfully", id);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuoteExists(id))
                {
                    _logger.LogWarning("Quote with ID: {Id} not found for update", id);
                    return NotFound($"Quote with ID {id} not found");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Quotes
        [HttpPost]
        public async Task<ActionResult<Quote>> PostQuote(Quote quote)
        {
            _logger.LogInformation("Creating a new quote");

            if (string.IsNullOrWhiteSpace(quote.quoteType) || string.IsNullOrWhiteSpace(quote.sales))
            {
                return BadRequest("Quote Type and Sales Person are required");
            }

            // Ensure we're not trying to set the ID explicitly
            quote.no = 0; // This will be ignored and the database will generate the ID

            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Quote created with ID: {Id}", quote.no);

            return CreatedAtAction("GetQuote", new { id = quote.no }, quote);
        }



        // DELETE: api/Quotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuote(int id)
        {
            _logger.LogInformation("Deleting quote with ID: {Id}", id);

            var quote = await _context.Quotes.FindAsync(id);
            if (quote == null)
            {
                _logger.LogWarning("Quote with ID: {Id} not found for deletion", id);
                return NotFound($"Quote with ID {id} not found");
            }

            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Quote with ID: {Id} deleted successfully", id);

            return NoContent();
        }

        private bool QuoteExists(int id)
        {
            return _context.Quotes.Any(e => e.no == id);
        }
    }
}