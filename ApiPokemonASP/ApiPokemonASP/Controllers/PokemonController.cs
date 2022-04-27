using ApiPokemonASP.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace ApiPokemonASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        private readonly HttpClient pokemon;
        public PokemonController(HttpClient httpClient)
        {
            pokemon = httpClient;
        }

        [HttpGet]
        public async Task<IActionResult> getAllPokemones()
        {
            HttpResponseMessage response = await pokemon.GetAsync("https://pokeapi.co/api/v2/pokemon/");
            response.EnsureSuccessStatusCode();

            return Ok(await response.Content.ReadAsStringAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getPokemonesById(string name)
        {
            HttpResponseMessage response = await pokemon.GetAsync($"https://pokeapi.co/api/v2/pokemon/{name}");
            response.EnsureSuccessStatusCode();

            return Ok(await response.Content.ReadAsStringAsync());
        }
        [HttpPost]
        public async Task<IActionResult> PostPokemon(PokeModel name)
        {
            HttpResponseMessage response = await pokemon.PostAsJsonAsync("https://pokeapi.co/api/v2/pokemon/", name);
            response.EnsureSuccessStatusCode();

            // Return url of the created resource.
            return Ok(response.Headers.Location);
        }
    }
}
