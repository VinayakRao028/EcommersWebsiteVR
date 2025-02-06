package melreposteria.org.controller;

import java.util.List;
import melreposteria.org.model.Producto;
import melreposteria.org.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping (path="/api/productos/")


public class ProductosController {
	
	private final ProductoService productoService;
	@Autowired
	public ProductosController(ProductoService productoService) {
	this.productoService=productoService;
	}

	@GetMapping
	public List <Producto> getProductos() {
	return productoService.getAllProducts();
	}//getProducto

	@GetMapping(path="{prodId}") //http://localhost:8080/api/productos/1
	public Producto getProducto(@PathVariable ("prodId") Long id) {
	return productoService.getProduct(id);
	}//getProducto
	 
	@DeleteMapping (path="{prodId}")
	public Producto deleteProducto(@PathVariable ("prodId") Long id) {
	return productoService.deleteProduct(id);
	}//deleteProducto

	@PostMapping
	public Producto addProducto(@RequestBody Producto producto) {
	return productoService.addProduct(producto);
	}//addProducto

	@PutMapping(path="{prodId}")
	public Producto updateProducto(@PathVariable("prodId") Long id,
	@RequestParam (required=false)String nombre,
	@RequestParam (required=false)String descripcion,
	@RequestParam (required=false)String imagen,
	@RequestParam (required=false)Double precio,
	@RequestParam(required=false) Long pedidosId){
	return  productoService.updateProduct(id, nombre, descripcion,
	imagen, precio, pedidosId); 
	}//updateProduct

} // class ProductosController
